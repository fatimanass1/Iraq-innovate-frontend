"use client";

import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminNotificationsService } from "../services/adminNotificationsService";
import type { AdminNotificationFilter } from "../types/admin-notification.types";
import { filterAdminNotifications } from "../utils/filter-notifications";

export const ADMIN_NOTIFICATIONS_QUERY_KEY = ["admin", "notifications"] as const;

export function useAdminNotifications() {
  const queryClient = useQueryClient();
  const [filter, setFilterState] = useState<AdminNotificationFilter>("all");
  const [page, setPage] = useState(1);
  const [activeId, setActiveId] = useState<string | null>(null);

  const setFilter = useCallback((nextFilter: AdminNotificationFilter) => {
    setFilterState(nextFilter);
    setPage(1);
  }, []);

  const query = useQuery({
    queryKey: [...ADMIN_NOTIFICATIONS_QUERY_KEY, page],
    queryFn: () => adminNotificationsService.getNotifications(page),
  });

  const notificationItems = query.data?.items;
  const filteredItems = notificationItems
    ? filterAdminNotifications(notificationItems, filter)
    : [];

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
      const item = notificationItems?.find((entry) => entry.id === id);
      if (item && !item.isRead) {
        markAsReadMutation.mutate(id);
      }
    },
    [markAsReadMutation, notificationItems],
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
