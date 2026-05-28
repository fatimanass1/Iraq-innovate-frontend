import type { Metadata } from "next";
import { SignUpScreen } from "@/features/auth";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function SignUpRoutePage() {
  return <SignUpScreen />;
}
