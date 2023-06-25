import { Button } from "@/components/ui/button";

import LoginDialog from "../dialogs/login-dialog";

export default function LoginButton() {
  return (
    <LoginDialog>
      <Button variant="secondary">Login</Button>
    </LoginDialog>
  );
}
