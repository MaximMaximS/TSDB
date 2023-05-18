export function found(cnt: number, name: string) {
  return `${cnt > 0 ? cnt : "No"} ${name}${cnt === 1 ? "" : "s"} found`;
}

export function pad(n: number) {
  return n.toString().padStart(2, "0");
}
