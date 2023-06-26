import "server-only";

import siteConfig from "@/config/site";
import { nanoid } from "nanoid";
import { cache } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => any;

/**
 * Wraps a function in a React cache
 * @param fn Function to wrap
 * @returns Cached function and a preload function
 */
export function cacher<T extends Func>(fn: T) {
  const get = cache(fn);

  const preload = (...args: Parameters<T>) => void get(...args);
  return [get, preload] as const;
}

/**
 * Calculates the time when a session expires
 * @returns Time when a session expires
 */
export function expirity() {
  return new Date(Date.now() + siteConfig.security.sessionLength);
}

/**
 * ID generator
 * @returns A random ID
 */
export function genId() {
  return nanoid();
}
