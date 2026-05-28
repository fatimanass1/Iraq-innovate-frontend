"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { ROUTES } from "@/shared/constants/routes";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="surface-card max-w-md space-y-4 p-8 text-center">
          <AlertTriangle className="mx-auto h-10 w-10 text-destructive" />
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">
            An unexpected error occurred. Please try again or return home.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button onClick={reset}>Try again</Button>
            <Link href={ROUTES.HOME}>
              <Button variant="secondary">Go home</Button>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
