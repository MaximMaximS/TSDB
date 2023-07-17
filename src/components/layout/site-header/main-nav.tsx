import Link from "next/link";

import siteConfig from "@/config/site";

import { Logo } from "@/components/icons";

import NavLink from "./nav-link";
import NavList from "./nav-list";

export default function MainNav({ logged }: { logged: boolean }) {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Logo width={24} height={24} className="animate-out fade-out" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav>
        <NavList>
          {siteConfig.paths
            .filter(({ login }) => !login || logged)
            .map((props) => (
              <li key={props.href}>
                <NavLink {...props} />
              </li>
            ))}
        </NavList>
      </nav>
    </div>
  );
}
