import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge tailwind classes
 * @param inputs Classes to merge
 * @returns Merged classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function seFormat(se: number, ep: number) {
  return `S${pad(se)}E${pad(ep)}`;
}

/**
 * Check if an object is not null or undefined
 * @param obj Object to check
 * @returns Whether the object is not null or undefined
 */
export function nn<T>(obj: T | undefined | null) {
  return obj !== undefined && obj !== null;
}
