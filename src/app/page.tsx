"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const { toast } = useToast();
  return (
    <div className="flex flex-col items-center justify-center">
      <Button variant="outline" onClick={() => toast({ title: "It Works!" })}>
        Hello, World!
      </Button>
    </div>
  );
}
