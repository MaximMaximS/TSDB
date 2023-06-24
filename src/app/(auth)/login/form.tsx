"use client";

import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";

export default function Form() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const usr = username.current;
    const pwd = password.current;
    if (usr === null || pwd === null) return;

    startTransition(async () => {
      const result = await login(usr.value, pwd.value);
      if (result) {
        router.refresh();
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password.",
        });
      }
    });
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Please log in</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={handleSubmit}
          className="grid w-full items-center gap-4">
          <Input
            name="username"
            type="text"
            placeholder="Username"
            ref={username}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            ref={password}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button disabled={isPending} form="login-form">
          Login
        </Button>
        {isPending && <Loader2 className="animate-spin" />}
      </CardFooter>
    </Card>
  );
}
