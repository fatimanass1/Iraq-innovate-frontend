import type {
  AdminProjectsFilters,
  AdminProjectListRow,
  AdminSortOption,
  AdminStatusFilter,
} from "../types/admin-projects.types";

function matchesSearch(row: AdminProjectListRow, query: string): boolean {
  if (!query) return true;
  const haystack = [
    row.title,
    row.ownerName,
    row.ownerEmail,
    row.universityLabel,
    row.category,
    row.statusLabelAr,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function matchesStatus(row: AdminProjectListRow, status: AdminStatusFilter): boolean {
  if (status === "all") return true;
  return row.status === status;
}

function matchesCategory(row: AdminProjectListRow, category: string): boolean {
  if (category === "all") return true;
  return String(row.categoryId) === category || row.category === category;
}

function matchesUniversity(row: AdminProjectListRow, university: string): boolean {
  if (university === "all") return true;
  return row.universityLabel === university;
}

function matchesDateRange(row: AdminProjectListRow, from: string, to: string): boolean {
  const created = new Date(row.createdAt).getTime();
  if (Number.isNaN(created)) return true;

  if (from) {
    const fromTime = new Date(from).getTime();
    if (!Number.isNaN(fromTime) && created < fromTime) return false;
  }

  if (to) {
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);
    const toTime = toDate.getTime();
    if (!Number.isNaN(toTime) && created > toTime) return false;
  }

  return true;
}

function sortRows(rows: AdminProjectListRow[], sort: AdminSortOption): AdminProjectListRow[] {
  const copy = [...rows];

  switch (sort) {
    case "oldest":
      return copy.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    case "updated":
    case "newest":
    default:
      return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export function filterAdminProjectRows(
  rows: AdminProjectListRow[],
  filters: AdminProjectsFilters,
): AdminProjectListRow[] {
  const query = filters.search.trim().toLowerCase();

  const filtered = rows.filter(
    (row) =>
      matchesSearch(row, query) &&
      matchesStatus(row, filters.status) &&
      matchesCategory(row, filters.category) &&
      matchesUniversity(row, filters.university) &&
      matchesDateRange(row, filters.dateFrom, filters.dateTo),
  );

  return sortRows(filtered, filters.sort);
}

export function paginateRows<T>(rows: T[], page: number, pageSize: number) {
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;

  return {
    rows: rows.slice(start, end),
    total,
    totalPages,
    page: safePage,
    start: total === 0 ? 0 : start + 1,
    end: Math.min(end, total),
  };
}
