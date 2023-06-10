/**
 * Generates a string for the number of items found
 * @param cnt Number of items found
 * @param name Name of the items
 * @returns String for the number of items found
 */
export function found(cnt: number, name: string) {
  return `${cnt > 0 ? cnt : "No"} ${name}${cnt === 1 ? "" : "s"} found`;
}

/**
 * Pads for (SXXEXX) format
 * @param n Number to pad
 * @returns Padded number
 */
export function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function SEFormat(se: number, ep: number) {
  return `S${pad(se)}E${pad(ep)}`;
}
