"use client";

import { useRef } from "react";

export default function NavList({ children }: { children: React.ReactNode }) {
  const menu = useRef<HTMLUListElement>(null);

  return (
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
      {children}
    </ul>
  );
}
