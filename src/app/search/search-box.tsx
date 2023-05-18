"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useIsPending, useStartTransition } from "./search-provider";

export default function SearchBox({ value }: { value: string }) {
  const router = useRouter();
  const startTransition = useStartTransition();
  const isPending = useIsPending();

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    if (startTransition === null) {
      throw new Error("SearchBox muste be used inside SearchProvider");
    }
    const { value } = e.target;
    startTransition(() => {
      router.replace(value.length > 0 ? `/search?q=${value}` : "/search");
    });
  }

  if (isPending === null) {
    throw new Error("SearchBox muste be used inside SearchProvider");
  }

  return (
    <Input
      className="my-2 w-96"
      type="search"
      placeholder="Search"
      onChange={handleSearch}
      defaultValue={value}
    />
  );
}
