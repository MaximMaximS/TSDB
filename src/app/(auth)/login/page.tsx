import Site from "@/components/site";
import { useSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";

import Form from "./form";

export default async function Page() {
  const session = await useSession();

  if (session !== null) {
    redirect("/");
  }

  return (
    <Site>
      <Form />
    </Site>
  );
}
