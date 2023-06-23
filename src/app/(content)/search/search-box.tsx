"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";

import { useStartTransition } from "./search-provider";

export default function SearchBox() {
  const params = useSearchParams();
  const value = params.get("q") ?? "";
  const router = useRouter();
  const startTransition = useStartTransition();

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    startTransition(() => {
      router.replace(value.length > 0 ? `/search?q=${value}` : "/search");
    });
  }

  return (
    <Input
      className="my-2 w-96"
      type="search"
      placeholder="Search"
      spellCheck={false}
      onChange={handleSearch}
      defaultValue={value}
    />
  );
}
