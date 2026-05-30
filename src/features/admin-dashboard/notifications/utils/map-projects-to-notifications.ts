import type { ApiProjectDetail } from "@/features/dashboard/projects/types/project-api.types";
import { formatProjectRelativeTime } from "@/features/dashboard/projects/utils/project.helpers";
import { ADMIN_NOTIFICATION_MESSAGES } from "../constants/admin-notification-messages";
import type { AdminNotificationItem, AdminNotificationType } from "../types/admin-notification.types";
import { resolveApiProjectIdFromProject } from "../../utils/project-id";

const RESUBMIT_THRESHOLD_MS = 60_000;

type StatusValueResolver = (project: ApiProjectDetail) => string;

function getProjectUpdatedAt(project: ApiProjectDetail): string {
  return project.updated_at ?? project.created_at;
}

function wasUpdatedAfterSubmission(project: ApiProjectDetail): boolean {
  const created = new Date(project.created_at).getTime();
  const updated = new Date(getProjectUpdatedAt(project)).getTime();
  if (Number.isNaN(created) || Number.isNaN(updated)) return false;
  return updated - created > RESUBMIT_THRESHOLD_MS;
}

function buildNotification(params: {
  id: string;
  project: ApiProjectDetail;
  type: AdminNotificationType;
  titleAr: string;
  bodyAr: string;
  eventAt: string;
  requiresAction: boolean;
}): AdminNotificationItem {
  const projectId = resolveApiProjectIdFromProject(params.project);
  if (!projectId) {
    throw new Error(`Invalid project id in notification payload: ${String(params.project.id)}`);
  }

  return {
    id: params.id,
    projectId,
    type: params.type,
    titleAr: params.titleAr,
    bodyAr: params.bodyAr,
    projectNameAr: params.project.title,
    timeLabel: formatProjectRelativeTime(params.eventAt),
    isRead: false,
    requiresAction: params.requiresAction,
    createdAt: params.eventAt,
  };
}

export function mapProjectToNotification(
  project: ApiProjectDetail,
  resolveStatusValue: StatusValueResolver,
): AdminNotificationItem | null {
  const projectId = resolveApiProjectIdFromProject(project);
  if (!projectId) {
    console.warn("[AdminNotifications] Skipping project with invalid id:", project.id);
    return null;
  }

  const statusValue = resolveStatusValue(project);
  const projectName = project.title.trim() || "مشروع بدون عنوان";

  if (statusValue === "approved") {
    const eventAt = getProjectUpdatedAt(project);
    return buildNotification({
      id: `project-${project.id}-approved`,
      project,
      type: "approved",
      titleAr: ADMIN_NOTIFICATION_MESSAGES.approved.titleAr,
      bodyAr: ADMIN_NOTIFICATION_MESSAGES.approved.bodyAr(projectName),
      eventAt,
      requiresAction: false,
    });
  }

  if (statusValue === "declined" || statusValue === "rejected") {
    const eventAt = getProjectUpdatedAt(project);
    return buildNotification({
      id: `project-${project.id}-declined`,
      project,
      type: "rejected",
      titleAr: ADMIN_NOTIFICATION_MESSAGES.declined.titleAr,
      bodyAr: ADMIN_NOTIFICATION_MESSAGES.declined.bodyAr(projectName),
      eventAt,
      requiresAction: false,
    });
  }

  if (statusValue === "changes_requested" || statusValue === "change_requested") {
    const eventAt = getProjectUpdatedAt(project);
    return buildNotification({
      id: `project-${project.id}-changes-requested`,
      project,
      type: "pending",
      titleAr: ADMIN_NOTIFICATION_MESSAGES.changesRequested.titleAr,
      bodyAr: ADMIN_NOTIFICATION_MESSAGES.changesRequested.bodyAr(projectName),
      eventAt,
      requiresAction: true,
    });
  }

  if (statusValue === "pending" || statusValue === "under_review") {
    if (wasUpdatedAfterSubmission(project)) {
      const eventAt = getProjectUpdatedAt(project);
      return buildNotification({
        id: `project-${project.id}-resubmitted`,
        project,
        type: "pending",
        titleAr: ADMIN_NOTIFICATION_MESSAGES.resubmitted.titleAr,
        bodyAr: ADMIN_NOTIFICATION_MESSAGES.resubmitted.bodyAr(projectName),
        eventAt,
        requiresAction: true,
      });
    }

    return buildNotification({
      id: `project-${project.id}-received`,
      project,
      type: "received",
      titleAr: ADMIN_NOTIFICATION_MESSAGES.newPending.titleAr,
      bodyAr: ADMIN_NOTIFICATION_MESSAGES.newPending.bodyAr(projectName),
      eventAt: project.created_at,
      requiresAction: true,
    });
  }

  return null;
}

export function mapProjectsToNotifications(
  projects: ApiProjectDetail[],
  resolveStatusValue: StatusValueResolver,
): AdminNotificationItem[] {
  return projects
    .map((project) => mapProjectToNotification(project, resolveStatusValue))
    .filter((item): item is AdminNotificationItem => item !== null)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
