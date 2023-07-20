import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function LoginButton() {
  return (
    <Button variant="secondary" asChild>
      <Link href={`/login`}>Login</Link>
    </Button>
  );
}
