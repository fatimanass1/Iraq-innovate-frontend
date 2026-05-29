import { AuthScreenShell } from "../AuthScreenShell";
import { SignInFormView } from "../SignInFormView";

export function SignInScreen() {
  return (
    <AuthScreenShell>
      <SignInFormView />
    </AuthScreenShell>
  );
}
