import { Suspense } from "react";
import { PageLoader } from "@/components/loaders";
import { LoginScreen } from "@/features/auth/screens/LoginScreen";

export default function LoginPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <LoginScreen />
    </Suspense>
  );
}
