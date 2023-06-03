// File system
import axios from "axios";
import fs from "node:fs";
import { URL } from "node:url";
import { load } from "cheerio";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { SocksProxyAgent } from "socks-proxy-agent";

const agent = new SocksProxyAgent("socks5://127.0.0.1:9050");

const USE_TOR = process.env["USE_TOR"] === "true";
const SLOW = process.env["SLOW"] === "true";

// Create data folder ./utils/data/pages
if (!fs.existsSync("./utils/data")) {
  fs.mkdirSync("./utils/data");
  fs.mkdirSync("./utils/data/pages");
} else if (!fs.existsSync("./utils/data/pages")) {
  fs.mkdirSync("./utils/data/pages");
}

/**
 * Fetches or load page from cache and returns it
 * @param url URL of the page to fetch
 * @param alias Alias of the page (used for caching)
 * @returns Fetched page
 */
async function fetchSite(url: URL, alias: string) {
  if (process.env["FETCH"] !== "true") {
    try {
      return fs.readFileSync(`./utils/data/pages/${alias}.html`).toString();
    } catch {
      console.log(`File ${alias} not found, fetching...`);
    }
  }
  let tries = 0;
  while (tries < 3) {
    try {
      const response = await axios({
        httpsAgent: USE_TOR ? agent : undefined,
        url: url.href,
        method: "GET",
      });

      if (response.status !== 200) {
        throw new Error(`Failed to fetch ${alias} (${url.toString()})`);
      }
      const result = z.string().parse(response.data);
      fs.writeFileSync(`./utils/data/pages/${alias}.html`, result);
      return result;
    } catch {
      tries++;
      await new Promise((resolve) => setTimeout(resolve, 1000 * tries));
      console.log(`${alias} failed, retrying...`);
      continue;
    }
  }
  throw new Error(`Failed to fetch ${alias} (${url.toString()})`);
}

const months = new Map([
  ["ledna", 1],
  ["února", 2],
  ["března", 3],
  ["dubna", 4],
  ["května", 5],
  ["června", 6],
  ["července", 7],
  ["srpna", 8],
  ["září", 9],
  ["října", 10],
  ["listopadu", 11],
  ["prosince", 12],
]);

async function generateEpisode(link: string, alias: string) {
  const page = await fetchSite(new URL(link), alias);
  const $ = load(page);

  const header = $("div.hb-intext")
    .clone()
    .children()
    .remove()
    .end()
    .text()
    .trim()
    .split(" – ");

  const title = z.string().parse(header.slice(1).join(" – "));
  const se = z
    .string()
    .array()
    .parse(z.string().parse(header[0]).split(" ")[1]?.split("×"));

  const season = z.coerce.number().parse(se[0]);
  const episode = z.coerce.number().parse(se[1]);

  // td containing "Český název" in table.karta-ep
  const czechName = $("td:contains('Český název')").next().text().trim();

  if (czechName !== title) {
    throw new Error(
      `Czech name ${czechName} does not match title ${title} for episode ${alias}`
    );
  }
  const prm = $("td:contains('Premiéra')").next().text().trim();

  const prem = prm.split(" ");
  if (prem.length !== 3) {
    console.log(prm);
    console.log(prem);
    throw new Error(`Failed to parse premiere ${prm}`);
  }

  const premiere = prem.map((x) => x.trim()) as [string, string, string];

  const m = months.get(premiere[1]);
  if (m === undefined) {
    throw new Error(`Failed to parse month ${premiere[1]}`);
  }
  const d = new Date(
    Date.UTC(
      z.coerce.number().parse(premiere[2]),
      m - 1,
      z.coerce.number().parse(premiere[0].slice(0, -1))
    )
  );

  const ps = $("div.down-block > p").toArray();

  let plot = "";

  for (const p of ps) {
    const text = $(p).text().trim();
    if (text.length === 0) {
      continue;
    }
    plot += text.replaceAll(/\n+/g, "\n") + "\n";
  }

  plot = plot.trim();

  return {
    title,
    season,
    episode,
    premiere: d,
    plot,
  };
}

async function main() {
  const root = await fetchSite(
    new URL("https://www.serialzone.cz/serial/simpsonovi/epizody/"),
    "root"
  );
  const $ = load(root);

  // div.r1 in div.subs
  const episodeRows = $("div.subs > div.r1").toArray();

  console.log(`Found ${episodeRows.length} episodes`);

  // Get first link in each div.r1
  const links = episodeRows.map((el) => {
    const e = $(el);
    const link = e.find("a").first();
    const href = link.attr("href");
    const alias = e.find("span.sunr").first().text();
    if (href === undefined || alias.length === 0) {
      throw new Error("Failed to parse episode link");
    }
    return [href, alias] as const;
  });

  let e: Awaited<ReturnType<typeof generateEpisode>>[] = [];
  if (SLOW) {
    for (const element of links) {
      e.push(await generateEpisode(...element));
    }
  } else {
    e = await Promise.all(links.map((element) => generateEpisode(...element)));
  }

  const episodes = e;

  /*
  const episodes = e.filter((x) => x !== null) as {
    title: string;
    season: number;
    episode: number;
    premiere: Date;
  }[];
  */

  // Sort episodes by season and episode
  episodes.sort((a, b) => {
    if (a.season !== b.season) {
      return a.season - b.season;
    }
    return a.episode - b.episode;
  });

  const ided = episodes.map((episode, index) => ({
    ...episode,
    id: index + 1,
  }));

  if (!process.argv.includes("--write")) {
    console.log("Not writing to db because --write was not provided");

    fs.writeFileSync(
      "./utils/data/episodes.json",
      JSON.stringify(ided, null, 2)
    );
    return;
  }

  const prisma = new PrismaClient();

  await prisma.episode.deleteMany();
  await prisma.episode.createMany({
    data: ided,
  });
}

void main();
