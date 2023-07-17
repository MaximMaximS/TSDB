import "server-only";

import { nanoid } from "nanoid";
import { headers } from "next/headers";
import { cache } from "react";

import siteConfig from "@/config/site";

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
export function genId(len?: number) {
  return nanoid(len);
}

/**
 * Extracts the IP and user agent from a request
 * @returns IP and user agent
 */
export function reqInfo() {
  const head = headers();
  const ip = head.get("x-real-ip");
  const agent = head.get("user-agent");
  return { ip, agent };
}
