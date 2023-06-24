import "server-only";

import siteConfig from "@/config/site";
import { cache } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => any;

export function cacher<T extends Func>(fn: T) {
  const get = cache(fn);

  const preload = (...args: Parameters<T>) => void get(...args);
  return [get, preload] as const;
}

export function expirity() {
  return new Date(Date.now() + siteConfig.security.sessionLength);
}
