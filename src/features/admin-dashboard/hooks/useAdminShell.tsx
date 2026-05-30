"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type AdminShellContextValue = {
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  notificationsOpen: boolean;
  toggleNotifications: () => void;
  closeNotifications: () => void;
  profileOpen: boolean;
  toggleProfile: () => void;
  closeProfile: () => void;
};

const AdminShellContext = createContext<AdminShellContextValue | null>(null);

export function AdminShellProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const value = useMemo<AdminShellContextValue>(
    () => ({
      sidebarOpen,
      openSidebar: () => setSidebarOpen(true),
      closeSidebar: () => setSidebarOpen(false),
      notificationsOpen,
      toggleNotifications: () => {
        setProfileOpen(false);
        setNotificationsOpen((open) => !open);
      },
      closeNotifications: () => setNotificationsOpen(false),
      profileOpen,
      toggleProfile: () => {
        setNotificationsOpen(false);
        setProfileOpen((open) => !open);
      },
      closeProfile: () => setProfileOpen(false),
    }),
    [notificationsOpen, profileOpen, sidebarOpen],
  );

  return <AdminShellContext.Provider value={value}>{children}</AdminShellContext.Provider>;
}

export function useAdminShell() {
  const context = useContext(AdminShellContext);
  if (!context) {
    throw new Error("useAdminShell must be used within AdminShellProvider");
  }
  return context;
}
