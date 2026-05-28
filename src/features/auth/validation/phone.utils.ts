/** Normalize Iraqi phone input to E.164 (+9647XXXXXXXXX). */
export function normalizeIraqiPhone(input: string): string {
  const trimmed = input.trim().replace(/[\s\-()]/g, "");

  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("+964")) {
    return trimmed;
  }

  if (trimmed.startsWith("964")) {
    return `+${trimmed}`;
  }

  if (trimmed.startsWith("07")) {
    return `+964${trimmed.slice(1)}`;
  }

  if (trimmed.startsWith("7") && trimmed.length === 10) {
    return `+964${trimmed}`;
  }

  return trimmed;
}

const IRAQI_MOBILE_E164_REGEX = /^\+9647\d{9}$/;

export function isValidIraqiPhone(input: string): boolean {
  const normalized = normalizeIraqiPhone(input);
  return IRAQI_MOBILE_E164_REGEX.test(normalized);
}

export const IRAQI_PHONE_ERROR_MESSAGE =
  "يرجى إدخال رقم هاتف عراقي صالح (مثال: 07701234567 أو +9647701234567)";
