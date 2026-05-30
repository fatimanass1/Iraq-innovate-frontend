"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { ProjectsApiError } from "@/features/dashboard/projects/types/project.types";
import { AdminChromeHeader } from "../components/layout/AdminChromeHeader";
import { AdminContentArea } from "../components/layout/AdminContentArea";
import { AdminProjectAdditionalInfoSection } from "../components/project-review/AdminProjectAdditionalInfoSection";
import { AdminProjectAttachmentsSection } from "../components/project-review/AdminProjectAttachmentsSection";
import { AdminProjectDescriptionSection } from "../components/project-review/AdminProjectDescriptionSection";
import { AdminProjectHeroCard } from "../components/project-review/AdminProjectHeroCard";
import { AdminProjectMediaGallery } from "../components/project-review/AdminProjectMediaGallery";
import { AdminProjectOwnerSection } from "../components/project-review/AdminProjectOwnerSection";
import { AdminProjectReviewPanel } from "../components/project-review/AdminProjectReviewPanel";
import { AdminProjectReviewSkeleton } from "../components/project-review/AdminProjectReviewSkeleton";
import { AdminProjectSummarySection } from "../components/project-review/AdminProjectSummarySection";
import { AdminProjectTeamSection } from "../components/project-review/AdminProjectTeamSection";
import { AdminDashboardErrorState } from "../components/states/AdminDashboardErrorState";
import { ADMIN_PROJECT_DETAILS, ADMIN_PROJECTS_HEADER } from "../constants/admin-projects-content";
import { ADMIN_PROJECT_REVIEW_CONTENT } from "../constants/admin-project-review-content";
import { ADMIN_PROJECT_REVIEW_THEME as T } from "../constants/admin-project-review-theme";
import { ADMIN_STATES } from "../constants/admin-dashboard-content";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { useAdminProjectDetails } from "../hooks/useAdminProjectDetails";
import { useAdminShell } from "../hooks/useAdminShell";
import { useAdminUpdateProjectStatus } from "../hooks/useAdminUpdateProjectStatus";
import { AdminDashboardShell } from "../layouts/AdminDashboardShell";
import { getAdminStatusLabel, normalizeAdminProjectStatus } from "../utils/admin-project-status";
import { formatProjectDetailRequestUrl, resolveApiProjectId } from "../utils/project-id";

function resolveRouteProjectId(raw: string | string[] | undefined): string {
  if (Array.isArray(raw)) return raw[0] ?? "";
  return raw ?? "";
}

function getProjectDetailsErrorMessage(
  error: unknown,
  routeProjectId: string,
  parsedId: number | null,
): string {
  if (error instanceof ProjectsApiError) {
    if (error.status === 404) {
      const requestUrl = parsedId ? formatProjectDetailRequestUrl(parsedId) : null;
      return [
        error.message,
        `معرّف المسار: ${routeProjectId || "—"}`,
        parsedId ? `معرّف API: ${parsedId}` : null,
        requestUrl ? `طلب: GET ${requestUrl}` : null,
      ]
        .filter(Boolean)
        .join(" · ");
    }
    return error.message;
  }

  return ADMIN_STATES.error;
}

export function AdminProjectDetailsPage() {
  const params = useParams<{ id: string }>();
  const projectId = resolveRouteProjectId(params.id);
  const parsedRouteId = resolveApiProjectId(projectId);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[AdminProjectDetailsPage] params.id", params.id, "→", projectId, "parsed", parsedRouteId);
    }
  }, [params.id, projectId, parsedRouteId]);

  const shell = useAdminShell();
  const overviewQuery = useAdminDashboard();
  const { data: project, isPending, isError, error, refetch, isFetching } = useAdminProjectDetails(projectId);
  const updateStatus = useAdminUpdateProjectStatus(projectId);

  const layoutProps = {
    activeNav: "projects" as const,
    sidebarOpen: shell.sidebarOpen,
    onSidebarClose: shell.closeSidebar,
  };

  const user = overviewQuery.data?.user ?? {
    name: "مدير النظام",
    role: "مدير النظام",
    initials: "م",
  };

  const adminStatus = useMemo(
    () => (project ? normalizeAdminProjectStatus(project.statusRaw, project.statusId) : "pending"),
    [project],
  );

  const statusLabelAr = useMemo(() => {
    if (!project) return "";
    return getAdminStatusLabel(adminStatus).ar;
  }, [adminStatus, project]);

  if (isPending) {
    return (
      <AdminDashboardShell {...layoutProps}>
        <div className="h-[74px]" aria-hidden="true" />
        <AdminProjectReviewSkeleton />
      </AdminDashboardShell>
    );
  }

  if (isError || !project) {
    const message = getProjectDetailsErrorMessage(error, projectId, parsedRouteId);
    return (
      <AdminDashboardShell {...layoutProps}>
        <AdminChromeHeader
          user={user}
          titleAr={ADMIN_PROJECT_DETAILS.pageTitle}
          titleEn="Project Details"
          searchValue=""
          onSearchChange={() => undefined}
          showSearch={false}
          onMenuClick={shell.openSidebar}
          profileOpen={shell.profileOpen}
          onProfileToggle={shell.toggleProfile}
          onProfileClose={shell.closeProfile}
        />
        <AdminDashboardErrorState message={message} onRetry={() => refetch()} />
      </AdminDashboardShell>
    );
  }

  return (
    <AdminDashboardShell {...layoutProps}>
      <AdminChromeHeader
        user={user}
        titleAr={ADMIN_PROJECT_DETAILS.pageTitle}
        titleEn="Project Details"
        descriptionAr={project.title}
        searchValue=""
        onSearchChange={() => undefined}
        showSearch={false}
        onMenuClick={shell.openSidebar}
        profileOpen={shell.profileOpen}
        onProfileToggle={shell.toggleProfile}
        onProfileClose={shell.closeProfile}
      />

      <div className="w-full min-w-0 overflow-x-hidden" style={{ backgroundColor: T.pageBg }}>
        <AdminContentArea sectionGap={T.contentGap}>
          {isFetching && updateStatus.isPending ? (
            <p className="text-end text-[12px] font-medium" style={{ color: T.textMuted }} lang="ar">
              {ADMIN_PROJECT_REVIEW_CONTENT.refreshing}
            </p>
          ) : null}

          <AdminProjectHeroCard project={project} status={adminStatus} statusLabelAr={statusLabelAr} />

          <div
            className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:gap-8"
            dir="rtl"
          >
            <div className="order-2 flex min-w-0 flex-col gap-4 sm:gap-6 lg:order-1 lg:gap-8">
              <AdminProjectDescriptionSection description={project.description} />
              <AdminProjectSummarySection summary={project.summary} />
              <AdminProjectMediaGallery items={project.media} />
              <AdminProjectAttachmentsSection items={project.attachments} />
            </div>

            <aside className="order-1 flex min-w-0 flex-col gap-4 sm:gap-5 lg:sticky lg:top-24 lg:order-2 lg:gap-6 lg:self-start">
              <AdminProjectReviewPanel
                status={adminStatus}
                isUpdating={updateStatus.isPending}
                onStatusUpdate={(status) => updateStatus.mutate({ status })}
              />
              <AdminProjectOwnerSection project={project} />
              <AdminProjectTeamSection members={project.teamMembers} />
              <AdminProjectAdditionalInfoSection project={project} />
            </aside>
          </div>
        </AdminContentArea>
      </div>
    </AdminDashboardShell>
  );
}
