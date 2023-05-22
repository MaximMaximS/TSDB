"use client";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { useStartTransition } from "./search-provider";

export default function SearchBox() {
  const params = useSearchParams();
  const value = params.get("q") ?? "";
  const router = useRouter();
  const startTransition = useStartTransition();

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    if (startTransition === null) {
      throw new Error("SearchBox muste be used inside SearchProvider");
    }
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
      onChange={handleSearch}
      defaultValue={value}
    />
  );
}
