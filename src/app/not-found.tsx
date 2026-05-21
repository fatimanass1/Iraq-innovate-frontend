import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <FileQuestion className="mb-4 h-12 w-12 text-muted-foreground" />
      <h1 className="heading-section mb-2">Page not found</h1>
      <p className="text-body mb-6 max-w-md">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link href={ROUTES.HOME}>
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
