export type AdminNotificationType = "approved" | "pending" | "received" | "rejected";

export type AdminNotificationFilter = "all" | "unread" | "action_required";

export type AdminNotificationItem = {
  id: string;
  projectId: number;
  type: AdminNotificationType;
  titleAr: string;
  bodyAr: string;
  projectNameAr: string;
  timeLabel: string;
  isRead: boolean;
  requiresAction: boolean;
  createdAt: string;
};

export type AdminNotificationsData = {
  items: AdminNotificationItem[];
  totalCount: number;
  hasMore: boolean;
};
