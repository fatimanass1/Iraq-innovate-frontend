"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { useProtectedNavigation } from "@/features/auth/hooks/useProtectedNavigation";
import { cn } from "@/shared/utils/utils";
import { Reveal, RevealItem, RevealStagger } from "@/shared/animations";
import { ProjectsApiError } from "@/features/dashboard/projects/types/project.types";
import { DASHBOARD_ACTIONS, DASHBOARD_SECTIONS, DASHBOARD_STATES } from "../../constants/dashboard-content";
import { useDashboardUser } from "@/features/auth/hooks/useDashboardUser";
import { useDashboard } from "../../hooks/useDashboard";
import { ActivityCard } from "../ActivityCard";
import { DashboardEmptyState } from "../DashboardEmptyState";
import { DashboardErrorState } from "../DashboardErrorState";
import { DashboardSkeleton } from "../DashboardSkeleton";
import { DashboardTopNavbar } from "../DashboardTopNavbar";
import { DashboardShell } from "../DashboardShell";
import { NewProjectButton } from "../NewProjectButton";
import { ProjectCard } from "../ProjectCard";
import { StatsCard } from "../StatsCard";

import { cairo } from "../../fonts";

export function DashboardScreen() {
  const router = useRouter();
  const { navigateToProjectSubmit } = useProtectedNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navbarUser = useDashboardUser();
  const { data, isLoading, isError, error, refetch, isFetching } = useDashboard();

  const filteredProjects = useMemo(() => {
    const projects = data?.projects ?? [];
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return projects;
    }

    return projects.filter((project) => {
      const searchable = [
        project.title,
        project.summary,
        project.category,
        project.status,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [data?.projects, searchQuery]);

  const isUnauthorized =
    error instanceof ProjectsApiError && error.status === 401;

  const shellProps = {
    activeNav: "dashboard" as const,
    sidebarOpen,
    onSidebarClose: () => setSidebarOpen(false),
  };

  if (isLoading) {
    return (
      <DashboardShell {...shellProps}>
        <div className="h-[74px] shrink-0 bg-white" aria-hidden="true" />
        <DashboardSkeleton />
      </DashboardShell>
    );
  }

  if (isError && !isUnauthorized) {
    const message =
      error instanceof ProjectsApiError
        ? error.message
        : "حدث خطأ غير متوقع.";

    return (
      <DashboardShell {...shellProps}>
        <DashboardErrorState message={message} onRetry={() => refetch()} />
      </DashboardShell>
    );
  }

  if (!data || isUnauthorized) {
    return (
      <DashboardShell {...shellProps}>
        <DashboardSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell {...shellProps}>
      <DashboardTopNavbar
        user={navbarUser}
        unreadNotifications={data.unreadNotifications}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="mx-auto w-full max-w-[1200px] min-w-0 overflow-x-hidden px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <Reveal preset="fade-up" className="mt-4 flex justify-stretch sm:mt-5 sm:justify-end">
          <NewProjectButton onClick={navigateToProjectSubmit} />
        </Reveal>

        <RevealStagger
          aria-label="Statistics"
          className="mt-5 grid w-full min-w-0 grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
          stagger={0.07}
        >
          {data.stats.map((stat) => (
            <RevealItem key={stat.id} preset="scale-soft">
              <StatsCard stat={stat} />
            </RevealItem>
          ))}
        </RevealStagger>

        <section className="mt-7" aria-label="Projects">
          <Reveal preset="fade-up" className="mb-4 flex items-center justify-start gap-1">
            <h2
              className={cn(cairo.className, "text-[14px] font-bold text-[#010B18]")}
              lang="ar"
            >
              {DASHBOARD_ACTIONS.allProjects}
            </h2>
            <ChevronLeft
              className="size-4 text-[rgba(1,11,24,0.32)]"
              aria-hidden="true"
            />
          </Reveal>

          {data.projects.length === 0 ? (
            <Reveal preset="fade">
              <DashboardEmptyState />
            </Reveal>
          ) : (
            <>
              <RevealStagger
                className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
                stagger={0.08}
              >
                {filteredProjects.map((project) => (
                  <RevealItem key={project.id} preset="fade-up">
                    <ProjectCard
                      project={project}
                      onViewDetails={(id) => router.push(ROUTES.projectDetails(id))}
                    />
                  </RevealItem>
                ))}
              </RevealStagger>

              {filteredProjects.length === 0 ? (
                <p
                  className={cn(
                    cairo.className,
                    "mt-4 text-center text-[13px] font-medium text-[rgba(1,11,24,0.45)]",
                  )}
                  lang="ar"
                >
                  {DASHBOARD_STATES.noSearchResults}
                </p>
              ) : null}
            </>
          )}
        </section>

        <section className="mt-7" aria-label="Recent activities" dir="rtl">
          <Reveal preset="fade-up" className="mb-5 block">
            <h2
              className={cn(
                cairo.className,
                "text-start text-[16px] font-bold text-[#010B18] sm:text-[18px]",
              )}
              lang="ar"
            >
              {DASHBOARD_SECTIONS.recentActivities}
            </h2>
          </Reveal>

          {data.activities.length === 0 ? (
            <p
              className={cn(
                cairo.className,
                "text-[14px] font-medium text-[rgba(1,11,24,0.45)] sm:text-[15px]",
              )}
              lang="ar"
            >
              {DASHBOARD_STATES.noActivities}
            </p>
          ) : (
            <RevealStagger className="flex flex-col gap-4" stagger={0.06}>
              {data.activities.map((activity) => (
                <RevealItem key={activity.id} preset="fade-up">
                  <ActivityCard activity={activity} />
                </RevealItem>
              ))}
            </RevealStagger>
          )}
        </section>

        {isFetching ? (
          <p className={cn(cairo.className, "sr-only")} lang="ar" aria-live="polite">
            جاري تحديث البيانات...
          </p>
        ) : null}
      </div>
    </DashboardShell>
  );
}
