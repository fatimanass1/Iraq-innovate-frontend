"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { DURATION, EASING } from "@/shared/animations/constants";
import { SUBMIT_PROJECT_THEME as T } from "../constants/submit-project-theme";
import { VALIDATION_THEME as V } from "../constants/validation-theme";
import type { BilingualMessage } from "../types/validation.types";
import { submitCairo, submitOutfit } from "../utils/fonts";
import { FieldValidationMessage } from "./FieldValidationMessage";

type FieldLabel = { en: string; ar: string };

type SubmitGlowSelectProps = {
  label: FieldLabel;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: { id: number; name: string }[];
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  error?: BilingualMessage;
  fieldId?: string;
};

const ITEM_RADIUS = 12;
const TRIGGER_HEIGHT = 48;

export function SubmitGlowSelect({
  label,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  isLoading = false,
  disabled = false,
  error,
  fieldId,
}: SubmitGlowSelectProps) {
  const reduceMotion = useReducedMotion();
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const hasValue = value.length > 0;
  const selectedOption = options.find((option) => String(option.id) === value);
  const isDisabled = disabled || isLoading;

  const close = useCallback(() => {
    setOpen(false);
    setHighlightIndex(-1);
    onBlur?.();
  }, [onBlur]);

  const selectOption = useCallback(
    (optionId: number) => {
      onChange(String(optionId));
      close();
    },
    [close, onChange],
  );

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, open]);

  useEffect(() => {
    if (!open) return;
    const selectedIndex = options.findIndex((option) => String(option.id) === value);
    setHighlightIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [open, options, value]);

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isDisabled) return;

    if (event.key === "Enter" && open && highlightIndex >= 0) {
      event.preventDefault();
      const option = options[highlightIndex];
      if (option) selectOption(option.id);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen((prev) => !prev);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setHighlightIndex((prev) => Math.min(prev + 1, options.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const displayPlaceholder = placeholder ?? `${label.en} / ${label.ar}`;
  const triggerText =
    isLoading
      ? displayPlaceholder
      : hasValue && selectedOption
        ? selectedOption.name
        : displayPlaceholder;

  return (
    <div ref={rootRef} className="relative w-full" id={fieldId ? `${fieldId}-wrapper` : undefined}>
      <div className="mb-2 flex items-center justify-end gap-1">
        <span
          className={cn(submitOutfit.className, "text-[12px] leading-4")}
          style={{ color: T.labelEn }}
        >
          {label.en}
        </span>
        <span
          className={cn(submitCairo.className, "text-[12px] leading-4 opacity-60")}
          style={{ color: T.labelEn }}
          dir="rtl"
        >
          {label.ar}
        </span>
      </div>

      <div
        className={cn("overflow-hidden rounded-2xl transition-shadow")}
        style={{
          border: open
            ? T.dropdownOpenBorder
            : error
              ? V.errorBorder
              : "1px solid rgba(0, 0, 0, 0.12)",
          boxShadow: open ? T.dropdownOpenGlow : error ? V.errorRing : "none",
          backgroundColor: error ? V.errorBackground : T.inputBg,
        }}
      >
        <button
          id={fieldId}
          type="button"
          disabled={isDisabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-invalid={error ? true : undefined}
          onBlur={() => {
            if (!open) onBlur?.();
          }}
          onClick={() => {
            if (!isDisabled) setOpen((prev) => !prev);
          }}
          onKeyDown={handleTriggerKeyDown}
          className={cn(
            submitOutfit.className,
            "flex w-full items-center justify-between gap-3 px-4 text-[14px] leading-[21px]",
            isDisabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
          )}
          style={{
            height: TRIGGER_HEIGHT,
            color: hasValue && !isLoading ? "#010B18" : T.labelEn,
            borderBottom: open ? "1px solid rgba(163, 230, 53, 0.2)" : "none",
          }}
        >
          <span className="min-w-0 flex-1 truncate text-start">{triggerText}</span>
          {isLoading ? (
            <Loader2 className="size-[18px] shrink-0 animate-spin text-[#4A7A00]" />
          ) : (
            <ChevronDown
              className={cn(
                "size-[18px] shrink-0 transition-transform duration-200",
                open ? "rotate-180 text-[#4A7A00]" : "text-[#6B7260]",
              )}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
        </button>

        <AnimatePresence initial={false}>
          {open && !isDisabled ? (
            <motion.div
              id={listboxId}
              role="listbox"
              aria-label={`${label.en} ${label.ar}`}
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: DURATION.fast, ease: EASING.smooth }}
              className="overflow-hidden"
            >
              <ul
                className="flex max-h-[240px] flex-col gap-2 overflow-y-auto overscroll-contain p-3 pt-2"
                style={{ scrollbarWidth: "thin" }}
              >
                {options.length === 0 ? (
                  <li
                    className={cn(
                      submitCairo.className,
                      "py-2 text-center text-[13px] text-[#6B7260]",
                    )}
                    dir="rtl"
                  >
                    لا توجد فئات متاحة
                  </li>
                ) : (
                  options.map((option, index) => {
                    const isSelected = String(option.id) === value;
                    const isHighlighted = index === highlightIndex && !isSelected;

                    return (
                      <li key={option.id} role="option" aria-selected={isSelected}>
                        <button
                          type="button"
                          onMouseEnter={() => setHighlightIndex(index)}
                          onClick={() => selectOption(option.id)}
                          className={cn(
                            submitOutfit.className,
                            "w-full px-3.5 py-2.5 text-start text-[14px] leading-[21px] transition-colors",
                          )}
                          style={{
                            borderRadius: ITEM_RADIUS,
                            border: isSelected
                              ? T.dropdownItemSelectedBorder
                              : "1px solid transparent",
                            backgroundColor: isSelected
                              ? T.dropdownItemSelectedBg
                              : isHighlighted
                                ? T.dropdownItemHoverBg
                                : "transparent",
                            color: isSelected ? T.progressValue : "#010B18",
                            fontWeight: isSelected ? 500 : 400,
                          }}
                        >
                          <span className="block truncate">{option.name}</span>
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      {error ? <FieldValidationMessage message={error} /> : null}
    </div>
  );
}
