import { Button } from "@/components/ui/button";

export const props = {
  variant: "ghost",
  size: "sm",
  className: "w-9 px-0",
} as const;

export default function HeaderButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Button {...props}>{children}</Button>;
}
