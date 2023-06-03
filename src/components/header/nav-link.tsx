"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";

export default function NavLink<T extends string>({
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
        pathname === href ? "text-foreground" : "text-foreground/60"
      )}>
      {label}
    </Link>
  );
}
