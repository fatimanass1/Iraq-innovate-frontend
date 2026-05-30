import type {
  AdminNotificationFilter,
  AdminNotificationItem,
} from "../types/admin-notification.types";

export function filterAdminNotifications(
  items: AdminNotificationItem[],
  filter: AdminNotificationFilter,
): AdminNotificationItem[] {
  switch (filter) {
    case "unread":
      return items.filter((item) => !item.isRead);
    case "action_required":
      return items.filter((item) => item.requiresAction);
    default:
      return items;
  }
}

export type AdminNotificationEmptyKey = "empty" | "emptyUnread" | "emptyAction";

export function getEmptyMessageForFilter(filter: AdminNotificationFilter): AdminNotificationEmptyKey {
  switch (filter) {
    case "unread":
      return "emptyUnread";
    case "action_required":
      return "emptyAction";
    default:
      return "empty";
  }
}
