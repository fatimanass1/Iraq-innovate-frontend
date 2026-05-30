"use client";

import { cn } from "@/shared/utils/utils";
import { ADMIN_PROJECTS_TABLE } from "../../constants/admin-projects-content";
import { ADMIN_PROJECTS_THEME as PM } from "../../constants/admin-projects-theme";
import { cairo } from "../../fonts";
import type { AdminProjectListRow } from "../../types/admin-projects.types";
import { getAdminProjectTableActionLabel } from "../../utils/admin-projects-table";
import { AdminProjectDetailsLink } from "../navigation/AdminProjectDetailsLink";
import { AdminStatusBadge } from "./AdminStatusBadge";

function OwnerAvatar({ name }: { name: string }) {
  const initial = name.trim().slice(0, 1) || "؟";
  return (
    <div
      className={cn(
        cairo.className,
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full border text-[12px] font-bold",
      )}
      style={{
        width: PM.avatarSize,
        height: PM.avatarSize,
        backgroundColor: PM.avatarBg,
        borderColor: PM.border,
        color: PM.textPrimary,
      }}
    >
      {initial}
    </div>
  );
}

function MetaColumn({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col items-end gap-0.5 px-6 first:ps-0 last:pe-0">
      <span
        className={cn(
          cairo.className,
          bold ? "text-[12px] font-bold leading-4" : "text-[12px] font-medium leading-4",
          "text-[#010B18]",
        )}
        lang="ar"
      >
        {value}
      </span>
      <span
        className={cn(cairo.className, "text-[10px] font-normal leading-[15px]")}
        style={{ color: PM.textSecondary }}
        lang="ar"
      >
        {label}
      </span>
    </div>
  );
}

type AdminProjectsTableProps = {
  rows: AdminProjectListRow[];
};

export function AdminProjectsTable({ rows }: AdminProjectsTableProps) {
  if (rows.length === 0) {
    return (
      <p
        className={cn(cairo.className, "rounded-[20px] border py-14 text-center text-[14px]")}
        style={{ background: PM.pageBg, borderColor: PM.border, color: PM.textSecondary }}
        lang="ar"
      >
        لا توجد مشاريع مطابقة
      </p>
    );
  }

  return (
    <>
      <div className="hidden flex-col py-2 lg:flex" style={{ gap: 12 }}>
        {rows.map((row) => (
          <article
            key={row.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border transition-colors lg:flex-nowrap"
            style={{
              padding: PM.rowPadding,
              backgroundColor: PM.pageBg,
              borderColor: PM.border,
            }}
          >
            <div className="flex min-w-0 flex-1 items-center gap-4 lg:max-w-[313px]">
              <div className="min-w-0 flex-1 text-end">
                <p
                  className={cn(cairo.className, "text-[16px] font-semibold leading-[22px] text-[#010B18]")}
                  lang="ar"
                >
                  {row.title}
                </p>
                <span
                  className={cn(
                    cairo.className,
                    "mt-1.5 inline-flex rounded px-2 py-0.5 text-[12px] font-normal leading-4",
                  )}
                  style={{ backgroundColor: "rgba(235, 235, 229, 0.6)", color: PM.textSecondary }}
                  lang="ar"
                >
                  {row.category}
                </span>
              </div>
            </div>

            <div
              className="hidden min-w-0 flex-1 items-center justify-center border-x lg:flex"
              style={{ borderColor: "rgba(229, 229, 223, 0.8)" }}
            >
              <div className="flex items-center">
                <div className="flex items-center gap-2.5 px-6">
                  <MetaColumn label={ADMIN_PROJECTS_TABLE.ownerLabel} value={row.ownerName} bold />
                  <OwnerAvatar name={row.ownerName} />
                </div>
                <MetaColumn label={ADMIN_PROJECTS_TABLE.universityLabel} value={row.universityLabel} />
                <MetaColumn label={ADMIN_PROJECTS_TABLE.date} value={row.submissionDateLabel} />
              </div>
            </div>

            <div
              className="flex w-full shrink-0 items-center justify-end gap-4 lg:w-auto"
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
            >
              <AdminStatusBadge status={row.status} label={row.statusLabelAr} />
              <AdminProjectDetailsLink
                projectId={row.id}
                source="projects-table"
                className={cn(
                  cairo.className,
                  "inline-flex items-center justify-center rounded-xl px-4 text-[12px] font-bold leading-4 transition-opacity hover:opacity-90",
                  row.status === "pending" ? "text-[#010B18]" : "border bg-white/90 text-[#010B18]",
                )}
                style={
                  row.status === "pending"
                    ? {
                        height: 26,
                        paddingBlock: 8,
                        backgroundColor: PM.primaryGreen,
                        boxShadow: "0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)",
                      }
                    : { height: 26, paddingBlock: 8, borderColor: PM.border }
                }
              >
                {getAdminProjectTableActionLabel(row.status)}
              </AdminProjectDetailsLink>
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-col gap-3 lg:hidden">
        {rows.map((row) => (
          <article
            key={row.id}
            className="rounded-[20px] border p-3.5 sm:p-4"
            style={{ background: PM.pageBg, borderColor: PM.border }}
          >
            <div className="w-full text-end">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className={cn(cairo.className, "text-[15px] font-semibold text-[#010B18]")} lang="ar">
                    {row.title}
                  </p>
                  <p className={cn(cairo.className, "mt-1 text-[12px]")} style={{ color: PM.textSecondary }} lang="ar">
                    {row.ownerName}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <AdminStatusBadge status={row.status} label={row.statusLabelAr} />
                <span className={cn(cairo.className, "text-[11px]")} style={{ color: PM.textSecondary }} lang="ar">
                  {row.submissionDateLabel}
                </span>
              </div>
            </div>
            <AdminProjectDetailsLink
              projectId={row.id}
              source="projects-table-mobile"
              className={cn(
                cairo.className,
                "mt-4 inline-flex h-[26px] w-full items-center justify-center rounded-xl text-[12px] font-bold",
                row.status === "pending" ? "text-[#010B18]" : "border bg-white/90",
              )}
              style={
                row.status === "pending"
                  ? { backgroundColor: PM.primaryGreen }
                  : { borderColor: PM.border }
              }
            >
              {getAdminProjectTableActionLabel(row.status)}
            </AdminProjectDetailsLink>
          </article>
        ))}
      </div>
    </>
  );
}
