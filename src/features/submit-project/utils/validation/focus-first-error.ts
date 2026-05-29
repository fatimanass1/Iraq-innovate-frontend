export function focusFirstInvalidField(fieldId?: string): void {
  if (!fieldId || typeof document === "undefined") return;

  window.requestAnimationFrame(() => {
    const element = document.getElementById(fieldId);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "center" });

    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLButtonElement
    ) {
      element.focus({ preventScroll: true });
      return;
    }

    const focusable = element.querySelector<HTMLElement>(
      "input, textarea, select, button, [tabindex]:not([tabindex='-1'])",
    );
    focusable?.focus({ preventScroll: true });
  });
}
