import { Suspense } from "react";

import Fallback from "./fallback";

interface WrapperProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export default function Wrapper({ fallback, children }: WrapperProps) {
  return (
    <Fallback fallback={fallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </Fallback>
  );
}
