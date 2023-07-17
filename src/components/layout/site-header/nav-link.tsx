"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type Href = Parameters<typeof Link>[0]["href"];

export default function NavLink({
  href,
  label,
}: {
  href: Href;
  label: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        pathname === href ? "text-foreground" : "text-foreground/60",
      )}>
      {label}
    </Link>
  );
}
