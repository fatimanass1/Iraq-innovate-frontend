"use client";

import { useState } from "react";
import { Check, Loader2, ShieldCheck, X } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { ADMIN_PROJECT_REVIEW_CONTENT } from "../../constants/admin-project-review-content";
import { ADMIN_PROJECT_REVIEW_THEME as T } from "../../constants/admin-project-review-theme";
import { cairo } from "../../fonts";
import type { AdminProjectStatus } from "../../types/admin-projects.types";
import type { AdminReviewStatusUpdate } from "../../hooks/useAdminUpdateProjectStatus";
import { AdminReviewSectionCard } from "./AdminReviewSectionCard";

type AdminProjectReviewPanelProps = {
  status: AdminProjectStatus;
  isUpdating: boolean;
  onStatusUpdate: (status: AdminReviewStatusUpdate) => void;
  className?: string;
};

function ReviewStatusBanner({
  status,
}: {
  status: Exclude<AdminProjectStatus, "pending" | "draft">;
}) {
  const config =
    status === "approved"
      ? {
          bg: T.approvedBannerBg,
          border: T.approvedBannerBorder,
          color: T.approvedBannerText,
          icon: Check,
          message: ADMIN_PROJECT_REVIEW_CONTENT.approvedBanner,
        }
      : status === "rejected"
        ? {
            bg: T.rejectedBannerBg,
            border: T.rejectedBannerBorder,
            color: T.rejectedBannerText,
            icon: X,
            message: ADMIN_PROJECT_REVIEW_CONTENT.rejectedBanner,
          }
        : {
            bg: T.changesBannerBg,
            border: T.changesBannerBorder,
            color: T.changesBannerText,
            icon: Check,
            message: ADMIN_PROJECT_REVIEW_CONTENT.changesRequestedBanner,
          };

  const Icon = config.icon;

  return (
    <div
      className={cn(
        cairo.className,
        "flex items-center justify-center gap-2 rounded-2xl border px-4 py-5 text-center text-[14px] font-bold",
      )}
      style={{
        backgroundColor: config.bg,
        borderColor: config.border,
        color: config.color,
      }}
      lang="ar"
    >
      <Icon className="size-5 shrink-0" strokeWidth={2.5} />
      <span>{config.message}</span>
    </div>
  );
}

export function AdminProjectReviewPanel({
  status,
  isUpdating,
  onStatusUpdate,
  className,
}: AdminProjectReviewPanelProps) {
  const [notes, setNotes] = useState("");
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const isPending = status === "pending";

  const handleReject = () => {
    if (!showRejectConfirm) {
      setShowRejectConfirm(true);
      return;
    }
    onStatusUpdate("rejected");
    setShowRejectConfirm(false);
  };

  return (
    <AdminReviewSectionCard
      title={ADMIN_PROJECT_REVIEW_CONTENT.reviewPanel}
      icon={
        <span
          className="flex size-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: "rgba(168, 207, 69, 0.14)" }}
        >
          <ShieldCheck className="size-[18px]" style={{ color: T.primaryGreen }} strokeWidth={1.75} />
        </span>
      }
      accentBorder
      variant="sidebar"
      className={className}
    >
      {isPending ? (
        <div className="flex flex-col" style={{ gap: 16 }}>
          <label className="flex flex-col gap-2">
            <span
              className={cn(cairo.className, "text-end text-[12px] font-bold")}
              style={{ color: T.textLabel }}
              lang="ar"
            >
              {ADMIN_PROJECT_REVIEW_CONTENT.reviewerNotes}
            </span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder={ADMIN_PROJECT_REVIEW_CONTENT.reviewerNotesPlaceholder}
              disabled={isUpdating}
              className={cn(
                cairo.className,
                "w-full resize-none text-end text-[14px] outline-none transition focus:border-[rgba(168,207,69,0.4)] disabled:opacity-60",
              )}
              style={{
                minHeight: T.textareaHeight,
                padding: 14,
                borderRadius: T.textareaRadius,
                backgroundColor: T.textareaBg,
                border: `1px solid ${T.textareaBorder}`,
                color: T.textPrimary,
              }}
              dir="rtl"
              lang="ar"
            />
          </label>

          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onStatusUpdate("approved")}
            className={cn(
              cairo.className,
              "inline-flex w-full items-center justify-center gap-2 font-bold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
            )}
            style={{
              padding: T.approveBtnPadding,
              borderRadius: T.approveBtnRadius,
              backgroundColor: T.primaryGreen,
              boxShadow: T.primaryGreenShadow,
              fontSize: 15,
              lineHeight: "22px",
              color: T.textPrimary,
            }}
          >
            {isUpdating ? <Loader2 className="size-4 animate-spin" /> : null}
            {isUpdating ? ADMIN_PROJECT_REVIEW_CONTENT.updating : ADMIN_PROJECT_REVIEW_CONTENT.approve}
          </button>

          <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => onStatusUpdate("changes_requested")}
              className={cn(
                cairo.className,
                "border font-bold transition disabled:cursor-not-allowed disabled:opacity-50",
              )}
              style={{
                padding: "12px 10px",
                borderRadius: T.approveBtnRadius,
                backgroundColor: T.requestChangesBg,
                borderColor: T.requestChangesBorder,
                color: T.requestChangesText,
                fontSize: 13,
                lineHeight: "18px",
              }}
              onMouseEnter={(event) => {
                if (!isUpdating) event.currentTarget.style.backgroundColor = T.requestChangesHover;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = T.requestChangesBg;
              }}
            >
              {ADMIN_PROJECT_REVIEW_CONTENT.requestChanges}
            </button>

            {showRejectConfirm ? (
              <button
                type="button"
                disabled={isUpdating}
                onClick={handleReject}
                className={cn(cairo.className, "border font-bold disabled:opacity-50")}
                style={{
                  padding: "12px 10px",
                  borderRadius: T.approveBtnRadius,
                  backgroundColor: "#FFFFFF",
                  borderColor: T.rejectBorder,
                  color: T.rejectText,
                  fontSize: 13,
                }}
              >
                {ADMIN_PROJECT_REVIEW_CONTENT.rejectConfirmAction}
              </button>
            ) : (
              <button
                type="button"
                disabled={isUpdating}
                onClick={handleReject}
                className={cn(cairo.className, "border font-bold transition disabled:opacity-50")}
                style={{
                  padding: "12px 10px",
                  borderRadius: T.approveBtnRadius,
                  backgroundColor: T.rejectBg,
                  borderColor: T.rejectBorder,
                  color: T.rejectText,
                  fontSize: 13,
                  lineHeight: "18px",
                }}
                onMouseEnter={(event) => {
                  if (!isUpdating) event.currentTarget.style.backgroundColor = T.rejectHover;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.backgroundColor = T.rejectBg;
                }}
              >
                {ADMIN_PROJECT_REVIEW_CONTENT.reject}
              </button>
            )}
          </div>

          {showRejectConfirm ? (
            <div
              className="flex flex-col gap-2 rounded-2xl border p-3"
              style={{ borderColor: T.rejectBorder, backgroundColor: T.rejectBg }}
            >
              <p className={cn(cairo.className, "text-end text-[12px] font-semibold")} style={{ color: T.rejectText }} lang="ar">
                {ADMIN_PROJECT_REVIEW_CONTENT.rejectConfirm}
              </p>
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => setShowRejectConfirm(false)}
                className={cn(cairo.className, "rounded-xl px-3 py-2 text-[12px] font-semibold")}
                style={{ backgroundColor: "rgba(255,255,255,0.85)", color: T.textPrimary }}
              >
                {ADMIN_PROJECT_REVIEW_CONTENT.rejectCancel}
              </button>
            </div>
          ) : null}
        </div>
      ) : status === "approved" || status === "rejected" || status === "changes_requested" ? (
        <ReviewStatusBanner status={status} />
      ) : null}
    </AdminReviewSectionCard>
  );
}
