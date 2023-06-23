"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";

import { login } from "./actions";

export default function Form() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const usr = username.current;
    const pwd = password.current;
    if (usr === null || pwd === null) return;

    setPending(true);

    const token = await login(usr.value, pwd.value);
    console.log(token);
    setPending(false);
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Please log in</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => void handleSubmit(e)}
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
        <Button disabled={pending} form="login-form">
          Login
        </Button>
        {pending && <Loader2 className="animate-spin" />}
      </CardFooter>
    </Card>
  );
}
