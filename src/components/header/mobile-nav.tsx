"use client";

import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import siteConfig from "@/config/site";
import { SidebarOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
          <SidebarOpen className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent size="xl" position="left" className="pr-0">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center">
          <Logo className="mr-2 h-4 w-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {siteConfig.paths.map((path) => (
              <Link
                onClick={() => setOpen(false)}
                key={path.href}
                href={path.href}>
                {path.label}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
