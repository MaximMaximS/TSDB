"use client";

import { cn } from "@/lib/utils";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderLink<T extends string>({
  href,
  label,
}: {
  href: Route<T>;
  label: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        pathname === href ? "text-foreground" : "text-foreground/60"
      )}>
      {label}
    </Link>
  );
}
