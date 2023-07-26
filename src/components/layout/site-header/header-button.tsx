import { Button } from "@/components/ui/button";

export default function HeaderButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button variant="ghost" size="sm" className="w-9 px-0">
      {children}
    </Button>
  );
}
