"use client";

import React from "react";

import { useIsPending } from "../search-provider";

interface FallbackProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function Fallback({ children, fallback }: FallbackProps) {
  const isPending = useIsPending();
  return <>{isPending ? fallback : children}</>;
}
