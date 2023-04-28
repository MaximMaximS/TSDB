"use client";
import { cn } from "@/lib/utils";
import { FlaskConical } from "lucide-react";
import { useState } from "react";

export default function HoverSpinner() {
  const [hover, setHover] = useState(false);
  return (
    <FlaskConical
      width={40}
      height={40}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={() => setHover(true)}
      className={cn("ml-4", hover && "animate-ping")}
    />
  );
}
