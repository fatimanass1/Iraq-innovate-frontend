export type MediaFileKind = "image" | "video" | "document";
export type DocumentPreviewKind = "pdf" | "docx" | "pptx" | "other";

export function getDocumentPreviewKind(file: File): DocumentPreviewKind {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf") || file.type === "application/pdf") return "pdf";
  if (name.endsWith(".docx")) return "docx";
  if (name.endsWith(".pptx")) return "pptx";
  return "other";
}

export function getMediaFileKind(file: File): MediaFileKind {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";

  const name = file.name.toLowerCase();
  if (/\.(mp4|webm|mov|m4v|avi)$/.test(name)) return "video";
  if (/\.(png|jpe?g|gif|webp|svg)$/.test(name)) return "image";

  return "document";
}

export function canPreviewInBrowser(file: File): boolean {
  const kind = getMediaFileKind(file);
  return kind === "image" || kind === "video";
}
