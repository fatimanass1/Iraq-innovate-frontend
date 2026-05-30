"use client";

import { ChevronLeft, FolderOpen } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { AdminProjectDetailsLink } from "../navigation/AdminProjectDetailsLink";
import { ADMIN_DASHBOARD_THEME as T } from "../../constants/admin-dashboard-theme";
import { ADMIN_SECTIONS, ADMIN_STATES } from "../../constants/admin-dashboard-content";
import { cairo } from "../../fonts";
import type { AdminEvaluationRow } from "../../types/admin-dashboard.types";
import type { ProjectStatus } from "@/features/dashboard/projects/types/project.types";
import { AdminPanelShell } from "../shared/AdminPanelShell";

const STATUS_STYLE: Record<ProjectStatus, { bg: string; text: string; border: string }> = {
  pending: {
    bg: T.statusPendingBg,
    text: T.statusPendingText,
    border: T.statusPendingBorder,
  },
  approved: {
    bg: T.statusApprovedBg,
    text: T.statusApprovedText,
    border: T.statusApprovedBorder,
  },
  rejected: {
    bg: T.statusRejectedBg,
    text: T.statusRejectedText,
    border: T.statusRejectedBorder,
  },
};

type AdminEvaluationsTableProps = {
  rows: AdminEvaluationRow[];
};

function EvaluationRow({ row }: { row: AdminEvaluationRow }) {
  const statusStyle = STATUS_STYLE[row.status];

  return (
    <AdminProjectDetailsLink
      projectId={row.id}
      source="evaluations-table"
      className={cn(
        "group flex flex-col gap-3 rounded-2xl border p-3.5 transition-colors sm:flex-row sm:items-center",
        "hover:border-[rgba(168,207,69,0.22)]",
      )}
      style={{
        borderColor: T.dividerLight,
        backgroundColor: T.innerCardBg,
      }}
    >
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: T.surfaceInset }}
      >
        <FolderOpen className="size-[18px]" style={{ color: T.textMuted }} strokeWidth={1.5} />
      </div>

      <div className="min-w-0 flex-1 text-end">
        <p
          className={cn(
            cairo.className,
            "truncate text-[14px] font-semibold text-[#010B18] transition-colors group-hover:text-[#7BA832]",
          )}
          lang="ar"
        >
          {row.title}
        </p>
        <p
          className={cn(cairo.className, "mt-1 truncate text-[12px]")}
          style={{ color: T.textMuted }}
          lang="ar"
        >
          {row.category}
        </p>
      </div>

      <span
        className={cn(
          cairo.className,
          "shrink-0 rounded-full border px-3 py-1 text-[11px] font-semibold",
        )}
        style={{
          backgroundColor: statusStyle.bg,
          color: statusStyle.text,
          borderColor: statusStyle.border,
        }}
        lang="ar"
      >
        {row.statusLabelAr}
      </span>

      <ChevronLeft
        className="size-4 shrink-0 opacity-40 transition-opacity group-hover:opacity-100"
        style={{ color: T.primaryGreen }}
        aria-hidden="true"
      />
    </AdminProjectDetailsLink>
  );
}

export function AdminEvaluationsTable({ rows }: AdminEvaluationsTableProps) {
  return (
    <AdminPanelShell
      title={ADMIN_SECTIONS.latestEvaluations}
      ariaLabel={ADMIN_SECTIONS.latestEvaluations}
      headerStart={
        rows.length > 0 ? (
          <span
            className={cn(cairo.className, "text-[12px] font-medium")}
            style={{ color: T.textMuted }}
            lang="ar"
          >
            {rows.length} تقديم
          </span>
        ) : null
      }
    >
      {rows.length === 0 ? (
        <p
          className={cn(cairo.className, "py-10 text-center text-[14px]")}
          style={{ color: T.textMuted }}
          lang="ar"
        >
          {ADMIN_STATES.emptyEvaluations}
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {rows.map((row) => (
            <EvaluationRow key={row.id} row={row} />
          ))}
        </div>
      )}
    </AdminPanelShell>
  );
}
