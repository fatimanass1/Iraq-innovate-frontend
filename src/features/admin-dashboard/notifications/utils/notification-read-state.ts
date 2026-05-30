const STORAGE_KEY = "admin-notifications-read-ids";

function readIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === "string"));
  } catch {
    return new Set();
  }
}

function writeIds(ids: Set<string>): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export const notificationReadState = {
  getReadIds(): Set<string> {
    return readIds();
  },

  markAsRead(id: string): void {
    const ids = readIds();
    ids.add(id);
    writeIds(ids);
  },

  markAllAsRead(allIds: string[]): void {
    writeIds(new Set(allIds));
  },

  applyReadState<T extends { id: string; isRead: boolean }>(items: T[]): T[] {
    const storedIds = readIds();
    return items.map((item) => ({
      ...item,
      isRead: storedIds.has(item.id) || item.isRead,
    }));
  },
};
