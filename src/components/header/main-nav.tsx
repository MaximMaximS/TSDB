"use client";

import Link from "next/link";

import siteConfig from "@/config/site";
import { Logo } from "@/components/icons";
import HeaderLink from "./header-link";
import { useRef } from "react";

export default function MainNav() {
  const menu = useRef<HTMLUListElement>(null);
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav>
        <ul
          ref={menu}
          className="menu-list before:menu-list-before h-full"
          onMouseOver={(e) => {
            if (menu.current === null) return;

            const target = e.target;
            if (
              !(target instanceof HTMLLIElement) &&
              !(target instanceof HTMLAnchorElement)
            )
              return;
            menu.current.style.setProperty(
              "--underline-width",
              `${target.offsetWidth}px`
            );
            menu.current.style.setProperty(
              "--underline-offset",
              `${target.offsetLeft}px`
            );
          }}
          onMouseLeave={() => {
            if (menu.current === null) return;
            menu.current.style.setProperty("--underline-width", "0px");
          }}>
          {siteConfig.paths.map((path) => (
            <li key={path.href} className="link-item">
              <HeaderLink {...path} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
