"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminProjectsService } from "../services/adminProjectsService";
import {
  ADMIN_PROJECTS_PAGE_SIZE,
  DEFAULT_ADMIN_PROJECTS_FILTERS,
  type AdminProjectsFilters,
} from "../types/admin-projects.types";
import { filterAdminProjectRows, paginateRows } from "../utils/filter-admin-projects";
import { AdminDashboardApiError } from "../api/adminDashboardApi";

export const ADMIN_PROJECTS_QUERY_KEY = ["admin-projects"] as const;

type UseAdminProjectsListOptions = {
  filters: AdminProjectsFilters;
  page: number;
  pageSize?: number;
};

export function useAdminProjectsList({
  filters,
  page,
  pageSize = ADMIN_PROJECTS_PAGE_SIZE,
}: UseAdminProjectsListOptions) {
  const query = useQuery({
    queryKey: ADMIN_PROJECTS_QUERY_KEY,
    queryFn: () => adminProjectsService.getProjectsList(),
    retry: (failureCount, error) => {
      if (error instanceof AdminDashboardApiError && (error.status === 401 || error.status === 403)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const data = useMemo(() => {
    if (!query.data) return null;

    const allRows = query.data.projects;
    const filteredAll = filterAdminProjectRows(allRows, {
      ...filters,
      status: "all",
    });

    const tabCounts = {
      all: filteredAll.length,
      pending: filteredAll.filter((row) => row.status === "pending").length,
      approved: filteredAll.filter((row) => row.status === "approved").length,
      rejected: filteredAll.filter((row) => row.status === "rejected").length,
      changes_requested: filteredAll.filter((row) => row.status === "changes_requested").length,
    };

    const filteredRows = filterAdminProjectRows(allRows, filters);
    const pagination = paginateRows(filteredRows, page, pageSize);

    return {
      ...query.data,
      filteredRows: pagination.rows,
      pagination,
      tabCounts,
    };
  }, [filters, page, pageSize, query.data]);

  return { ...query, data };
}

export { DEFAULT_ADMIN_PROJECTS_FILTERS };
