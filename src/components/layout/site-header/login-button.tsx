import LoginDialog from "@/components/dialogs/login-dialog";
import { Button } from "@/components/ui/button";

export default function LoginButton() {
  return (
    <LoginDialog>
      <Button variant="secondary">Login</Button>
    </LoginDialog>
  );
}
