/**
 * Allow only same-origin relative paths to prevent open redirects.
 */
export function getSafeRedirectPath(
  redirect: string | null | undefined,
  fallback: string,
): string {
  if (!redirect) return fallback;

  const trimmed = redirect.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return fallback;
  }

  return trimmed;
}
