/** Tokens from Figma frame `project management` (149:949) */
export const ADMIN_PROJECTS_THEME = {
  pageBg: "#F5F5F2",
  surface: "rgba(255, 255, 255, 0.8)",
  border: "#E5E5DF",
  borderLight: "rgba(1, 11, 24, 0.06)",
  textPrimary: "#010B18",
  textSecondary: "#70706B",
  textMuted: "rgba(1, 11, 24, 0.45)",

  primaryGreen: "#A8CF45",
  shadow: "0px 8px 24px rgba(1, 11, 24, 0.04)",

  statHeight: 104,
  statPadding: 20,
  statRadius: 20,
  statIconSize: 48,
  statIconRadius: 12,
  statLabelSize: 12,
  statLabelLineHeight: 16,
  statValueSize: 24,
  statValueLineHeight: 32,

  panelRadius: 20,
  panelPadding: 16,
  panelGap: 16,

  tabRadius: 12,
  tabPaddingY: 9,
  tabPaddingX: 20,
  tabActiveBg: "#A8CF45",
  tabInactiveBg: "transparent",
  tabCountBg: "rgba(112, 112, 107, 0.15)",

  filterFieldHeight: 44,
  filterFieldRadius: 12,
  filterFieldPaddingX: 12,
  applyButtonBg: "#010B18",
  applyButtonRadius: 12,

  rowPadding: 20,
  rowGap: 16,
  avatarSize: 32,
  avatarBg: "rgba(168, 207, 69, 0.22)",

  paginationBtnSize: 32,
  paginationBtnRadius: 12,
  paginationGap: 4,
} as const;

export const ADMIN_PM_STAT_CARD_STYLES = {
  total: {
    cardBg: "rgba(255, 255, 255, 0.8)",
    iconBg: "#EBEBE5",
    iconBorder: "transparent",
    valueColor: "#010B18",
  },
  pending: {
    cardBg: "rgba(255, 255, 255, 0.8)",
    iconBg: "#FFFBEB",
    iconBorder: "#FEF3C6",
    valueColor: "#FE9A00",
  },
  approved: {
    cardBg: "rgba(255, 255, 255, 0.8)",
    iconBg: "#ECFDF5",
    iconBorder: "#D0FAE5",
    valueColor: "#A8CF45",
  },
  rejected: {
    cardBg: "rgba(255, 255, 255, 0.8)",
    iconBg: "#FEF2F2",
    iconBorder: "#FFE2E2",
    valueColor: "#F33D46",
  },
} as const;
