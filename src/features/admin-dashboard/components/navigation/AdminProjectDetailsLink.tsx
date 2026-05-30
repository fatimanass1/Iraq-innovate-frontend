"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import {
  getAdminProjectDetailsHref,
  logAdminProjectDetailsOpen,
  type AdminProjectNavSource,
} from "../../utils/admin-project-navigation";

type AdminProjectDetailsLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  projectId: unknown;
  source: AdminProjectNavSource;
  children: ReactNode;
  onBlockedClick?: () => void;
};

/** Canonical admin link to `/admin/projects/{project.id}` — blocks invalid ids. */
export function AdminProjectDetailsLink({
  projectId,
  source,
  children,
  onBlockedClick,
  onClick,
  ...props
}: AdminProjectDetailsLinkProps) {
  const href = getAdminProjectDetailsHref(projectId, source);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href) {
      event.preventDefault();
      onBlockedClick?.();
      return;
    }

    logAdminProjectDetailsOpen(source, projectId, href);
    onClick?.(event);
  };

  if (!href) {
    return (
      <span {...props} aria-disabled="true" data-invalid-project-id>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
