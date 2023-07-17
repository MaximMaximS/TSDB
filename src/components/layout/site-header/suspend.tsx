import { Suspense } from "react";

import AuthIndicator from "./auth-indicator";

export default function Suspend({ fallback }: { fallback: React.ReactNode }) {
  return (
    <Suspense fallback={fallback}>
      <AuthIndicator fallback={fallback} />
    </Suspense>
  );
}
