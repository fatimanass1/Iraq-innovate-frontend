import { Suspense } from "react";
import { SignInScreen } from "@/features/auth";

export default function SignInRoutePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F6F7F3]">
          <div className="size-8 animate-spin rounded-full border-2 border-[#A8CF45] border-t-transparent" />
        </div>
      }
    >
      <SignInScreen />
    </Suspense>
  );
}
