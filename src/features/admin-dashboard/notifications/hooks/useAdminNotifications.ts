"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminNotificationsService } from "../services/adminNotificationsService";
import type { AdminNotificationFilter } from "../types/admin-notification.types";
import { filterAdminNotifications } from "../utils/filter-notifications";

export const ADMIN_NOTIFICATIONS_QUERY_KEY = ["admin", "notifications"] as const;

export function useAdminNotifications() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<AdminNotificationFilter>("all");
  const [page, setPage] = useState(1);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const query = useQuery({
    queryKey: [...ADMIN_NOTIFICATIONS_QUERY_KEY, page],
    queryFn: () => adminNotificationsService.getNotifications(page),
  });

  const filteredItems = useMemo(() => {
    if (!query.data?.items) return [];
    return filterAdminNotifications(query.data.items, filter);
  }, [filter, query.data?.items]);

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => adminNotificationsService.markAsRead(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ADMIN_NOTIFICATIONS_QUERY_KEY });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => adminNotificationsService.markAllAsRead(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ADMIN_NOTIFICATIONS_QUERY_KEY });
    },
  });

  const handleSelect = useCallback(
    (id: string) => {
      setActiveId(id);
      const item = query.data?.items.find((entry) => entry.id === id);
      if (item && !item.isRead) {
        markAsReadMutation.mutate(id);
      }
    },
    [markAsReadMutation, query.data?.items],
  );

  const loadMore = useCallback(() => {
    if (query.data?.hasMore) {
      setPage((current) => current + 1);
    }
  }, [query.data?.hasMore]);

  return {
    filter,
    setFilter,
    activeId,
    items: filteredItems,
    hasMore: query.data?.hasMore ?? false,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isFetching: query.isFetching,
    loadMore,
    handleSelect,
    markAllAsRead: markAllAsReadMutation.mutate,
    isMarkingAll: markAllAsReadMutation.isPending,
  };
}
