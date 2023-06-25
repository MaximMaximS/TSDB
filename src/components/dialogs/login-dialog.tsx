"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { login } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { useRef, useTransition } from "react";

import FormInput from "./form-input";

export default function LoginDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  async function handleLogin(u: string, p: string) {
    const res = await login(u, p);
    if (!res) {
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
      });
      return;
    }
    startTransition(() => {
      router.refresh();
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const usr = username.current;
    const pwd = password.current;
    if (usr === null || pwd === null) return;
    void handleLogin(usr.value, pwd.value);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Please enter your username and password.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          id="login-form"
          onSubmit={handleSubmit}>
          <FormInput
            id="username"
            type="text"
            label="Username"
            ref={username}
          />
          <FormInput
            id="password"
            type="password"
            label="Password"
            ref={password}
          />
        </form>
        <DialogFooter>
          <Button form="login-form" disabled={isPending}>
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
