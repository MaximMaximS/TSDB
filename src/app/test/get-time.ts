import { z } from "zod";

// WorldtimeAPI
const timeSchema = z.object({
  dateTime: z.string(),
});

export default async function getTime(fetchOpts?: RequestInit) {
  const res = await fetch(
    "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Prague",
    fetchOpts
  );
  const { dateTime } = timeSchema.parse(await res.json());
  const time = new Date(dateTime);
  if (Number.isNaN(time.getTime())) {
    throw new Error("Invalid time");
  }
  return time;
}
