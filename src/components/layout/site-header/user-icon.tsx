import { User2 } from "lucide-react";

import LogoutDialog from "@/components/dialogs/logout-dialog";

import HeaderButton from "./header-button";

export default function UserIcon() {
  return (
    <LogoutDialog>
      <HeaderButton>
        <User2 />
      </HeaderButton>
    </LogoutDialog>
  );
}
