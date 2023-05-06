"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";

export default function HeaderLink<T extends string>({
  href,
  label,
}: {
  href: Route<T> | URL;
  label: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        pathname === href.toString() ? "text-foreground" : "text-foreground/60"
      )}>
      {label}
    </Link>
  );
}
