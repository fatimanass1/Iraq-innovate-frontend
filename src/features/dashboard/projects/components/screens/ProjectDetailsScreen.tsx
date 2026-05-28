"use client";

import { useState } from "react";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { DashboardTopNavbar } from "@/features/dashboard/components/DashboardTopNavbar";
import { useDashboardUser } from "@/features/auth/hooks/useDashboardUser";
import { PROJECT_DETAILS_CONTENT } from "../../constants/project-details-content";
import { PROJECT_DETAILS_FIGMA } from "../../constants/project-details-figma-theme";
import { useProjectDetails } from "../../hooks/useProjectDetails";
import { ProjectsApiError } from "../../types/project.types";
import { ProjectAttachmentsList } from "../ProjectAttachmentsList";
import { ProjectDetailsErrorState } from "../ProjectDetailsErrorState";
import { ProjectDetailsHero } from "../ProjectDetailsHero";
import { ProjectDetailsInfoSection } from "../ProjectDetailsInfoSection";
import { ProjectDetailsSidebar } from "../ProjectDetailsSidebar";
import { ProjectDetailsSkeleton } from "../ProjectDetailsSkeleton";
import { ProjectDetailsToolbar } from "../ProjectDetailsToolbar";
import { ProjectMediaGallery } from "../ProjectMediaGallery";
import { ProjectTeamMembersList } from "../ProjectTeamMembersList";

type ProjectDetailsScreenProps = {
  projectId: string;
};

export function ProjectDetailsScreen({ projectId }: ProjectDetailsScreenProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navbarUser = useDashboardUser();
  const { data: project, isPending, isFetching, isError, error, refetch } =
    useProjectDetails(projectId);

  const isRedirectingToSignIn =
    error instanceof ProjectsApiError && error.status === 401;
  const showLoading = (isPending || isFetching) && !isError && !project;
  const showError = isError && !isRedirectingToSignIn;

  const shellProps = {
    activeNav: "my-projects" as const,
    sidebarOpen,
    onSidebarClose: () => setSidebarOpen(false),
  };

  if (showLoading || isRedirectingToSignIn) {
    return (
      <DashboardShell {...shellProps}>
        <div className="h-[74px] shrink-0 bg-white max-sm:h-[64px]" aria-hidden="true" />
        <ProjectDetailsSkeleton />
      </DashboardShell>
    );
  }

  if (showError || !project) {
    return (
      <DashboardShell {...shellProps}>
        <DashboardTopNavbar
          user={navbarUser}
          unreadNotifications={0}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          onMenuClick={() => setSidebarOpen(true)}
          titleAr={PROJECT_DETAILS_CONTENT.pageTitleAr}
          titleEn={PROJECT_DETAILS_CONTENT.pageTitleEn}
        />
        <ProjectDetailsErrorState error={error} onRetry={() => refetch()} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell {...shellProps}>
      <DashboardTopNavbar
        user={navbarUser}
        unreadNotifications={0}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuClick={() => setSidebarOpen(true)}
        titleAr={PROJECT_DETAILS_CONTENT.pageTitleAr}
        titleEn={PROJECT_DETAILS_CONTENT.pageTitleEn}
      />

      <div
        className="mx-auto w-full max-w-[1280px] min-w-0 overflow-x-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
        style={{ backgroundColor: PROJECT_DETAILS_FIGMA.pageBg }}
      >
        <ProjectDetailsToolbar project={project} />
        <ProjectDetailsHero project={project} />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,340px)] lg:items-start">
          <div className="flex min-w-0 flex-col gap-6">
            <ProjectDetailsInfoSection project={project} />
            <ProjectMediaGallery items={project.media} />
            <ProjectAttachmentsList items={project.attachments} />
            <ProjectTeamMembersList members={project.teamMembers} />
          </div>

          <div className="lg:sticky lg:top-24">
            <ProjectDetailsSidebar project={project} />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
