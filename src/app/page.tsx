"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { H1 } from "@/components/static/text";
import { useToast } from "@/components/ui/use-toast";
import { useState, useTransition } from "react";
import Site from "@/components/static/site";
import Box from "@/components/static/box";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [checked, setChecked] = useState<boolean | "indeterminate">(false);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Site>
      <Box>
        <div className="mb-4">
          <H1>Test</H1>
        </div>
        <div className="mb-4 flex space-x-2 text-left">
          <Checkbox
            id="terms1"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Accept terms and conditions
            </label>
            <p className="text-sm text-muted-foreground">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
        <div className="flex">
          <Button
            disabled={!checked}
            variant="destructive"
            onClick={() =>
              toast({
                title: "Registered",
                description: "You have been registered.",
              })
            }>
            Register
          </Button>
          <Button
            disabled={isPending}
            variant="outline"
            onClick={() => {
              startTransition(() => {
                router.push("/test");
              });
            }}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Redirect
          </Button>
        </div>
      </Box>
    </Site>
  );
}
