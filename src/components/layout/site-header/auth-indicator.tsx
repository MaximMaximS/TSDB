import { getSession } from "@/lib/server/auth";

import LoginButton from "./login-button";
import UserIcon from "./user-icon";

export default async function AuthIndicator() {
  const session = await getSession();

  return <>{session === null ? <LoginButton /> : <UserIcon />}</>;
}
