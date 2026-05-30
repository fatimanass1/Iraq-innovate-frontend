import { ADMIN_CONTENT_LAYOUT, ADMIN_DASHBOARD_THEME as D } from "./admin-dashboard-theme";

/** Review detail page — aligned with Admin Dashboard design system */
export const ADMIN_PROJECT_REVIEW_THEME = {
  pageBg: D.pageBg,
  cardBg: "#FFFFFF",
  cardBorder: "#E7ECD9",
  cardBorderAccent: "rgba(168, 207, 69, 0.22)",
  cardRadius: D.cardRadius,
  cardRadiusLg: D.cardRadiusLg,
  cardPadding: ADMIN_CONTENT_LAYOUT.panelPadding,
  cardGap: 20,
  cardShadow: D.cardShadow,

  textPrimary: D.textPrimary,
  textSecondary: D.textSecondary,
  textMuted: D.textMuted,
  textLabel: D.textSubtle,

  primaryGreen: D.primaryGreen,
  primaryGreenShadow: "0px 12px 32px 0px rgba(168, 207, 69, 0.15)",

  divider: D.divider,
  dividerLight: D.dividerLight,
  surfaceHover: D.surfaceHover,
  surfaceInset: D.surfaceInset,
  innerCardBg: D.innerCardBg,

  approveBtnPadding: "14px 20px",
  approveBtnRadius: 16,

  requestChangesBg: "#FFFBEB",
  requestChangesBorder: "#FEF3C6",
  requestChangesText: "#D97706",
  requestChangesHover: "#FEF9C3",

  rejectBg: "#FEF2F2",
  rejectBorder: "#FEE2E2",
  rejectText: "#DC2626",
  rejectHover: "#FEE2E2",

  approvedBannerBg: D.statusApprovedBg,
  approvedBannerBorder: D.statusApprovedBorder,
  approvedBannerText: D.statusApprovedText,

  rejectedBannerBg: D.statusRejectedBg,
  rejectedBannerBorder: D.statusRejectedBorder,
  rejectedBannerText: D.statusRejectedText,

  changesBannerBg: "#FFFBEB",
  changesBannerBorder: "#FEF3C6",
  changesBannerText: "#D97706",

  metaChipBg: D.surfaceInset,
  categoryChipBg: "rgba(235, 235, 229, 0.6)",

  summaryBoxBg: D.pageBg,
  summaryBoxBorder: "#E7ECD9",
  summaryBoxRadius: 16,
  summaryBoxPadding: 20,

  attachmentRowBg: D.innerCardBg,
  attachmentRowRadius: 16,
  attachmentIconBg: "rgba(168, 207, 69, 0.12)",
  attachmentIconSize: 44,

  mediaGalleryHeight: 280,
  mediaThumbHeight: 88,
  mediaTileRadius: 16,

  sidebarWidth: 340,
  contentGap: ADMIN_CONTENT_LAYOUT.sectionGap,
  sidebarGap: 24,

  heroRadius: D.cardRadius,
  heroPadding: 24,
  heroAvatarSize: 52,

  sectionTitleSize: D.sectionTitleSize,
  sectionTitleLineHeight: D.sectionTitleLineHeight,
  sidebarLabelSize: 12,
  sidebarLabelLineHeight: 16,

  ownerNameSize: 18,
  ownerNameLineHeight: 26,

  textareaBg: D.pageBg,
  textareaBorder: "#E7ECD9",
  textareaHeight: 120,
  textareaRadius: 16,

  maxWidth: ADMIN_CONTENT_LAYOUT.maxWidth,
} as const;
