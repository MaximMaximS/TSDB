import { Suspense } from "react";

import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";
import Nav from "./nav";

interface WrapProps {
  mobile: boolean;
  fallback: React.ReactNode;
}

function Wrap({ mobile, fallback }: WrapProps) {
  return (
    <Suspense fallback={fallback}>
      <Nav mobile={mobile} fallback={fallback} />
    </Suspense>
  );
}

export default function NavWrapper({ mobile }: { mobile: boolean }) {
  return (
    <Wrap
      mobile={mobile}
      fallback={
        mobile ? <MobileNav logged={false} /> : <MainNav logged={false} />
      }
    />
  );
}
