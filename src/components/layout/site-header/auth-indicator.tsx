import { getSession } from "@/lib/server/auth";

import UserIcon from "./user-icon";

export default async function AuthIndicator({
  fallback,
}: {
  fallback: React.ReactNode;
}) {
  const session = await getSession();

  return <>{session === null ? <>{fallback}</> : <UserIcon />}</>;
}
