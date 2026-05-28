"use client";

import { useState } from "react";
import { MY_PROJECTS_PAGE, PROJECTS_CONTENT } from "@/features/dashboard/projects/constants/projects-content";
import { useMyProjects } from "@/features/dashboard/projects/hooks/useMyProjects";
import { useProjects } from "@/features/dashboard/projects/hooks/useProjects";
import { ProjectsApiError } from "@/features/dashboard/projects/types/project.types";
import { useDashboardUser } from "@/features/auth/hooks/useDashboardUser";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { DashboardTopNavbar } from "@/features/dashboard/components/DashboardTopNavbar";
import { DashboardErrorState } from "@/features/dashboard/components/DashboardErrorState";
import { DashboardSkeleton } from "@/features/dashboard/components/DashboardSkeleton";
import { RevealItem, RevealStagger } from "@/shared/animations";
import { EmptyProjects, ProjectCard, ProjectsHeader } from "..";

export function MyProjectsScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navbarUser = useDashboardUser();
  const { data, isLoading, isError, error, refetch } = useProjects();
  const {
    projects,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
  } = useMyProjects(data?.projects ?? []);
  const isUnauthorized = error instanceof ProjectsApiError && error.status === 401;

  if (isLoading || isUnauthorized) {
    return (
      <DashboardShell
        activeNav="my-projects"
        sidebarOpen={sidebarOpen}
        onSidebarClose={() => setSidebarOpen(false)}
      >
        <div className="h-[74px] shrink-0 bg-white" aria-hidden="true" />
        <DashboardSkeleton />
      </DashboardShell>
    );
  }

  if (isError) {
    return (
      <DashboardShell
        activeNav="my-projects"
        sidebarOpen={sidebarOpen}
        onSidebarClose={() => setSidebarOpen(false)}
      >
        <DashboardErrorState
          message={
            error instanceof ProjectsApiError
              ? error.message
              : PROJECTS_CONTENT.errorTitle
          }
          onRetry={() => refetch()}
        />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      activeNav="my-projects"
      sidebarOpen={sidebarOpen}
      onSidebarClose={() => setSidebarOpen(false)}
    >
      <DashboardTopNavbar
        user={navbarUser}
        unreadNotifications={0}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuClick={() => setSidebarOpen(true)}
        titleAr={MY_PROJECTS_PAGE.navbarTitleAr}
        titleEn={MY_PROJECTS_PAGE.navbarTitleEn}
      />

      <div className="mx-auto w-full max-w-[1200px] min-w-0 overflow-x-hidden px-4 sm:px-6 lg:px-8">
        <ProjectsHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <RevealStagger
          aria-label="My projects"
          className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
          stagger={0.08}
        >
          {projects.map((project) => (
            <RevealItem key={project.id} preset="fade-up">
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealStagger>

        {projects.length === 0 ? (
          <EmptyProjects
            message={
              (data?.projects.length ?? 0) === 0
                ? PROJECTS_CONTENT.emptyDescription
                : PROJECTS_CONTENT.noSearchResults
            }
          />
        ) : null}
      </div>
    </DashboardShell>
  );
}
