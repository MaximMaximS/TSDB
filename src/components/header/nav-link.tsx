"use client";

import type { SiteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Href = SiteConfig["paths"][number]["href"];

export default function NavLink({
  href,
  label,
}: {
  href: Href;
  label: string;
}) {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname === href ? "text-foreground" : "text-foreground/60"
        )}>
        {label}
      </Link>
    </li>
  );
}
