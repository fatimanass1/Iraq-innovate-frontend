import Link from "next/link";
import { APP_CONFIG } from "@/constants/app";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 font-semibold", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary text-sm font-bold text-primary-foreground">
        II
      </span>
      <span className="text-lg tracking-tight">{APP_CONFIG.NAME}</span>
    </Link>
  );
}
