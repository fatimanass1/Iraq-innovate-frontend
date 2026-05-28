"use client";

import { useMemo, useState } from "react";
import type { ProjectFilterTab, ProjectListItem } from "../types/project.types";

function matchesTab(project: ProjectListItem, tab: ProjectFilterTab): boolean {
  if (tab === "all") return true;
  return project.status === tab;
}

function matchesSearch(project: ProjectListItem, query: string): boolean {
  if (!query) return true;

  const searchable = [project.title, project.summary, project.category, project.status]
    .join(" ")
    .toLowerCase();

  return searchable.includes(query);
}

export function filterProjects(
  projects: ProjectListItem[],
  activeTab: ProjectFilterTab,
  searchQuery: string,
): ProjectListItem[] {
  const query = searchQuery.trim().toLowerCase();

  return projects.filter(
    (project) => matchesTab(project, activeTab) && matchesSearch(project, query),
  );
}

export function useMyProjects(projects: ProjectListItem[]) {
  const [activeTab, setActiveTab] = useState<ProjectFilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(
    () => filterProjects(projects, activeTab, searchQuery),
    [projects, activeTab, searchQuery],
  );

  return {
    projects: filteredProjects,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
  };
}
