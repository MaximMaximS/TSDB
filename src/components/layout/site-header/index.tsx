import { getSession } from "@/lib/server/auth";

import LoginButton from "./login-button";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";
import ModeToggle from "./mode-toggle";
import UserIcon from "./user-icon";

export default async function SiteHeader() {
  const session = await getSession();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav logged={session !== null} />
        <MobileNav logged={session !== null} />
        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <nav className="flex items-center space-x-1">
            {session === null ? <LoginButton /> : <UserIcon />}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
