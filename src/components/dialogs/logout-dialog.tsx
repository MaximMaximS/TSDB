"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { logout } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  async function handleLogout() {
    const res = await logout();
    if (!res) {
      toast({
        title: "Logout failed",
        description: "Please try again.",
      });
      setPending(false);
      return;
    }
    router.refresh();
    toast({
      title: "Logout successful",
    });
    setPending(false);
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setPending(true);
    void handleLogout();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={pending} onClick={handleSubmit}>
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
