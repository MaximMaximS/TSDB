import { User2 } from "lucide-react";

import LogoutDialog from "@/components/dialogs/logout-dialog";
import { Button } from "@/components/ui/button";

export default function UserIcon() {
  return (
    <LogoutDialog>
      <Button variant="ghost" size="sm" className="w-9 px-0">
        <User2 />
      </Button>
    </LogoutDialog>
  );
}
