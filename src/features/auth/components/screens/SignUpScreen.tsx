import { AuthScreenShell } from "../AuthScreenShell";
import { SignUpFormView } from "../SignUpFormView";

export function SignUpScreen() {
  return (
    <AuthScreenShell>
      <SignUpFormView />
    </AuthScreenShell>
  );
}
