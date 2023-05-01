import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";
import HeaderLink from "./header-link";

export default function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {siteConfig.paths.map((path) => (
          <HeaderLink key={path.href} {...path} />
        ))}
      </nav>
    </div>
  );
}
