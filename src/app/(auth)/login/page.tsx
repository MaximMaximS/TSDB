import { redirect } from "next/navigation";

import { getSession } from "@/lib/server/auth";

import LoginForm from "./login-form";

export default async function Page() {
  const session = await getSession();

  if (session !== null) {
    redirect(`/`);
  }

  return <LoginForm />;
}
