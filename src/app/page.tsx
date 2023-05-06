"use client";

import Site from "@/components/site";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function Page() {
  const { toast } = useToast();
  const [count, setCount] = useState(0);
  return (
    <Site>
      <Button
        variant="outline"
        onClick={() => {
          toast({ title: "It Works!", description: count.toString() });
          setCount((c) => c + 1);
        }}>
        Hello, World! {count}
      </Button>
    </Site>
  );
}
