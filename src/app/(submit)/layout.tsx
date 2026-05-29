import type { ReactNode } from "react";
import { SubmitProjectLayout } from "@/features/submit-project";

export default function SubmitFlowRouteLayout({ children }: { children: ReactNode }) {
  return <SubmitProjectLayout>{children}</SubmitProjectLayout>;
}
