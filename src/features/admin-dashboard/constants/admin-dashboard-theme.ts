/** Content-area tokens from Figma `Dashboard Overview` (149:2) — layout chrome uses `DASHBOARD_THEME` */
export const ADMIN_CONTENT_LAYOUT = {
  maxWidth: 1160,
  padding: 32,
  sectionGap: 32,
  statsRowHeight: 146,
  statsCardWidth: 256,
  statsCardPadding: 24,
  statsCardGap: 15.5,
  statsCardRadius: 20,
  statsIconSize: 48,
  statsIconRadius: 16,
  panelRadius: 24,
  panelPadding: 24,
} as const;

export const ADMIN_DASHBOARD_THEME = {
  pageBg: "#F5F5F2",

  darkNavy: "#010B18",
  primaryGreen: "#A8CF45",
  accentLime: "#B8FF2C",

  cardBg: "rgba(255, 255, 255, 0.85)",
  cardBorder: "rgba(255, 255, 255, 0.6)",
  /** Soft dividers — avoid heavy dark lines */
  divider: "rgba(1, 11, 24, 0.06)",
  dividerLight: "rgba(1, 11, 24, 0.04)",
  surfaceHover: "rgba(1, 11, 24, 0.03)",
  surfaceInset: "rgba(1, 11, 24, 0.02)",
  innerCardBg: "rgba(255, 255, 255, 0.72)",
  cardRadius: 20,
  cardRadiusLg: 24,
  cardShadow: "0px 8px 24px rgba(1, 11, 24, 0.04)",
  cardBackdrop: "blur(12px)",

  highlightCardBg: "#010B18",
  highlightCardText: "#FFFFFF",
  highlightLabel: "rgba(255, 255, 255, 0.72)",
  highlightTrendMuted: "rgba(255, 255, 255, 0.55)",

  textPrimary: "#010B18",
  textSecondary: "rgba(1, 11, 24, 0.6)",
  textMuted: "rgba(1, 11, 24, 0.45)",
  textSubtle: "rgba(1, 11, 24, 0.4)",
  textTrendMuted: "rgba(1, 11, 24, 0.4)",

  statLabelSize: 14,
  statLabelLineHeight: 20,
  statValueSize: 30,
  statValueLineHeight: 36,
  trendSize: 14,
  trendLineHeight: 20,

  iconBgTotal: "rgba(168, 207, 69, 0.1)",
  iconBgPending: "rgba(92, 198, 208, 0.1)",
  iconBgApproved: "rgba(34, 197, 94, 0.1)",
  iconBgRejected: "rgba(239, 68, 68, 0.1)",

  trendPositive: "#A8CF45",
  trendPending: "#5CC6D0",
  trendApproved: "#22C55E",
  trendNegative: "#EF4444",

  chartLineTotal: "#A8CF45",
  chartLineApproved: "#3B82F6",
  chartGrid: "#F3F4F6",
  chartToggleBg: "rgba(1, 11, 24, 0.04)",

  statusPendingBg: "#FFFBEB",
  statusPendingBorder: "#FEF3C6",
  statusPendingDot: "#FD9A00",
  statusPendingText: "#FE9A00",

  statusApprovedBg: "#ECFDF5",
  statusApprovedBorder: "#D0FAE5",
  statusApprovedDot: "#009966",
  statusApprovedText: "#A8CF45",

  statusRejectedBg: "#FEF2F2",
  statusRejectedBorder: "#FFE2E2",
  statusRejectedDot: "#F33D46",
  statusRejectedText: "#F33D46",

  sectionTitleSize: 18,
  sectionTitleLineHeight: 28,
  sectionSubtitleSize: 14,
  sectionSubtitleLineHeight: 20,

  urgentBadge: "rgba(239, 68, 68, 0.12)",
  urgentText: "rgba(220, 38, 38, 0.95)",

  /** Used by profile menu overlay only */
  sidebarBorder: "rgba(1, 11, 24, 0.08)",
  logoutColor: "rgba(239, 68, 68, 0.85)",
} as const;
