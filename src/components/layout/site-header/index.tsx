import LoginButton from "./login-button";
import ModeToggle from "./mode-toggle";
import NavWrapper from "./nav-wrapper";
import Suspend from "./suspend";

export default function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-14 items-center">
        <NavWrapper mobile={false} />
        <NavWrapper mobile={true} />
        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <nav className="flex items-center space-x-1">
            <Suspend fallback={<LoginButton />} />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
