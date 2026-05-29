import type { Metadata } from "next";
import { SubmitProjectScreen } from "@/features/submit-project";

export const metadata: Metadata = {
  title: "Submit Project",
};

export default function SubmitProjectPage() {
  return <SubmitProjectScreen />;
}
