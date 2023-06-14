import { Logo } from "@/components/icons";
import siteConfig from "@/config/site";
import Link from "next/link";

import NavLink from "./nav-link";
import NavList from "./nav-list";

export default function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav>
        <NavList>
          {siteConfig.paths.map((props) => (
            <li key={props.href}>
              <NavLink {...props} />
            </li>
          ))}
        </NavList>
      </nav>
    </div>
  );
}
