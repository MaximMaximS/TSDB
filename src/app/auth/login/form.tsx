"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <form
      onSubmit={(e) => void handleSubmit(e)}
      className="space-y-4 rounded p-4 outline outline-secondary">
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
      <Button disabled={pending} type="submit">
        Login
      </Button>
    </form>
  );
}
