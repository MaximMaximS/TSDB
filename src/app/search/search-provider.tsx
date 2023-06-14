"use client";

import {
  type TransitionStartFunction,
  createContext,
  useContext,
  useTransition,
} from "react";

const IsPendingContext = createContext<boolean | null>(null);
const StartTransitionContext = createContext<TransitionStartFunction | null>(
  null
);

export function useIsPending() {
  const isPending = useContext(IsPendingContext);
  if (isPending === null) {
    throw new Error("useIsPending must be used within a SearchProvider");
  }
  return isPending;
}

export function useStartTransition() {
  const startTransition = useContext(StartTransitionContext);
  if (startTransition === null) {
    throw new Error("useStartTransition must be used within a SearchProvider");
  }
  return startTransition;
}

export default function SearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <IsPendingContext.Provider value={isPending}>
      <StartTransitionContext.Provider value={startTransition}>
        {children}
      </StartTransitionContext.Provider>
    </IsPendingContext.Provider>
  );
}
