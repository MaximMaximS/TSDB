import "server-only";

import type { Episode } from "@prisma/client";
import { headers } from "next/headers";
import { message } from "statuses";
import { z } from "zod";

import prisma from "./prisma";

/**
 * Create a basic response with a status code
 * @param code HTTP status code
 * @returns Response with status code and message
 */
export function basicResponse(code: number) {
  return new Response(message[code], { status: code });
}

/**
 * Decode a basic auth header
 * @param authorization Basic auth header
 * @returns Credentials or null
 */
function decodeBasicAuth(authorization: string | null) {
  if (authorization === null) {
    return null;
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Basic" || token === undefined) {
    return null;
  }

  const [username, password] = Buffer.from(token, "base64")
    .toString()
    .split(":");

  if (username === undefined || password === undefined) {
    return null;
  }

  return { username, password };
}

/**
 * Handle basic auth for an API request
 * @returns Id of user or 401 response
 */
export async function apiAuth() {
  const headersList = headers();
  const auth = decodeBasicAuth(headersList.get("authorization"));

  if (auth === null) {
    return basicResponse(401);
  }

  const uid = await prisma.user.login(auth.username, auth.password);

  return uid ?? basicResponse(401);
}

/**
 * Parse an episode id from a string
 * @param id Episode id
 * @returns Parsed id or 400 response
 */
export function parseId(id: unknown) {
  const res = z.coerce.number().int().gte(1).safeParse(id);
  if (!res.success) {
    return basicResponse(400);
  }

  return res.data;
}

/**
 * Parse JSON from a request
 * @param request Request to extract JSON from
 * @param parser Function to parse JSON
 * @returns Parsed JSON or 400 response
 */
export async function parseJson<T>(
  request: Request,
  parser: (json: unknown) => T
) {
  try {
    const json = (await request.json()) as unknown;
    return parser(json);
  } catch {
    return basicResponse(400);
  }
}

/**
 * Replace a date with a timestamp
 * @param episode Episode to fix
 * @returns Fixed episode
 */
export function fixDate(episode: Episode) {
  const ms = episode.premiere.getTime();
  const s = Math.floor(ms / 1000);
  return {
    ...episode,
    premiere: s,
  };
}
