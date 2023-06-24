import MainNav from "@/components/header/main-nav";
import ModeToggle from "@/components/header/mode-toggle";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/server/auth";
import Link from "next/link";

import MobileNav from "./mobile-nav";
import UserIcon from "./user-icon";

export default async function SiteHeader() {
  const session = await useSession();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <nav className="flex items-center space-x-1">
            {session === null ? (
              <Button asChild variant="secondary">
                <Link href="/login">Login</Link>
              </Button>
            ) : (
              <UserIcon />
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
