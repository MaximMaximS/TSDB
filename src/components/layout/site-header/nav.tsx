import { getSession } from "@/lib/server/auth";

import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";

interface NavProps {
  mobile: boolean;
  fallback: React.ReactNode;
}

export default async function Nav({ mobile, fallback }: NavProps) {
  const session = await getSession();

  return (
    <>
      {session ? (
        mobile ? (
          <MobileNav logged={true} />
        ) : (
          <MainNav logged={true} />
        )
      ) : (
        <>{fallback}</>
      )}
    </>
  );
}
