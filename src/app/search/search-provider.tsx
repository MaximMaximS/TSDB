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
  return useContext(IsPendingContext);
}

export function useStartTransition() {
  return useContext(StartTransitionContext);
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
