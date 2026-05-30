"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { DURATION, EASING } from "@/shared/animations/constants";
import type { SelectOption } from "@/types/common";

export type CustomSelectVariant = "admin" | "form";
export type CustomSelectMenuMode = "popover" | "inline";

export type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: SelectOption[];
  placeholder?: string;
  label?: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  error?: boolean;
  emptyMessage?: string;
  variant?: CustomSelectVariant;
  menuMode?: CustomSelectMenuMode;
  className?: string;
  triggerClassName?: string;
  fontClassName?: string;
  id?: string;
  dir?: "rtl" | "ltr";
  height?: number;
};

const VARIANT_THEME = {
  admin: {
    triggerHeight: 44,
    triggerRadius: 12,
    triggerBorder: "#E5E5DF",
    triggerBg: "#F5F5F2",
    triggerText: "#010B18",
    placeholderColor: "#70706B",
    fontSize: 13,
    lineHeight: "20px",
    openBorder: "1.5px solid rgba(168, 207, 69, 0.45)",
    openGlow: "0px 0px 0px 3px rgba(168, 207, 69, 0.12)",
    chevronOpen: "#A8CF45",
    chevronClosed: "rgba(1, 11, 24, 0.32)",
    itemRadius: 10,
    itemSelectedBorder: "1.5px solid #A8CF45",
    itemSelectedBg: "rgba(168, 207, 69, 0.12)",
    itemHoverBg: "rgba(245, 245, 242, 1)",
    itemSelectedColor: "#010B18",
    itemTextColor: "#010B18",
    panelBg: "#FFFFFF",
    panelBorder: "#E5E5DF",
    panelShadow: "0px 10px 28px 0px rgba(1, 11, 24, 0.08)",
    inlineDivider: "1px solid rgba(168, 207, 69, 0.2)",
  },
  form: {
    triggerHeight: 48,
    triggerRadius: 16,
    triggerBorder: "1px solid rgba(0, 0, 0, 0.12)",
    triggerBg: "#FFFFFF",
    triggerText: "#010B18",
    placeholderColor: "#8A8F80",
    fontSize: 14,
    lineHeight: "21px",
    openBorder: "1.5px solid rgba(163, 230, 53, 1)",
    openGlow: "0px 0px 14px 0px rgba(163, 230, 53, 0.22)",
    chevronOpen: "#4A7A00",
    chevronClosed: "#6B7260",
    itemRadius: 12,
    itemSelectedBorder: "1.5px solid #A8CF45",
    itemSelectedBg: "rgba(240, 244, 232, 0.6)",
    itemHoverBg: "rgba(240, 244, 232, 1)",
    itemSelectedColor: "#4A7A00",
    itemTextColor: "#010B18",
    panelBg: "#FFFFFF",
    panelBorder: "rgba(0, 0, 0, 0.09)",
    panelShadow: "0px 10px 28px 0px rgba(0, 0, 0, 0.08)",
    inlineDivider: "1px solid rgba(163, 230, 53, 0.2)",
  },
} as const;

export function CustomSelect({
  value,
  onChange,
  onBlur,
  options,
  placeholder = "",
  label,
  disabled = false,
  isLoading = false,
  error = false,
  emptyMessage = "لا توجد خيارات متاحة",
  variant = "admin",
  menuMode = "popover",
  className,
  triggerClassName,
  fontClassName,
  id,
  dir = "rtl",
  height,
}: CustomSelectProps) {
  const theme = VARIANT_THEME[variant];
  const reduceMotion = useReducedMotion();
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const hasValue = value.length > 0;
  const selectedOption = options.find((option) => option.value === value);
  const isDisabled = disabled || isLoading;
  const triggerHeight = height ?? theme.triggerHeight;

  const close = useCallback(() => {
    setOpen(false);
    setHighlightIndex(-1);
    onBlur?.();
  }, [onBlur]);

  const selectOption = useCallback(
    (optionValue: string) => {
      onChange(optionValue);
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

  const resolveHighlightIndex = useCallback(() => {
    const selectedIndex = options.findIndex((option) => option.value === value);
    return selectedIndex >= 0 ? selectedIndex : 0;
  }, [options, value]);

  const openMenu = useCallback(() => {
    setHighlightIndex(resolveHighlightIndex());
    setOpen(true);
  }, [resolveHighlightIndex]);

  const toggleMenu = useCallback(() => {
    if (open) {
      setHighlightIndex(-1);
      setOpen(false);
      return;
    }
    setHighlightIndex(resolveHighlightIndex());
    setOpen(true);
  }, [open, resolveHighlightIndex]);

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isDisabled) return;

    if (event.key === "Enter" && open && highlightIndex >= 0) {
      event.preventDefault();
      const option = options[highlightIndex];
      if (option) selectOption(option.value);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenu();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        openMenu();
        return;
      }
      setHighlightIndex((prev) => Math.min(prev + 1, options.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        openMenu();
        return;
      }
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const triggerText =
    isLoading
      ? placeholder
      : hasValue && selectedOption
        ? selectedOption.label
        : placeholder;

  const triggerBorder = open
    ? theme.openBorder
    : error
      ? "1.5px solid #F33D46"
      : theme.triggerBorder;

  const triggerShadow = open ? theme.openGlow : error ? "0px 0px 0px 3px rgba(243, 61, 70, 0.12)" : "none";

  const optionsList = (
    <ul
      className={cn(
        "flex max-h-[240px] flex-col gap-1.5 overflow-y-auto overscroll-contain p-2",
        menuMode === "inline" && "gap-2 p-3 pt-2",
      )}
      style={{ scrollbarWidth: "thin" }}
      role="presentation"
    >
      {options.length === 0 ? (
        <li
          className={cn(fontClassName, "py-2 text-center text-[13px]")}
          style={{ color: theme.placeholderColor }}
          dir="rtl"
        >
          {emptyMessage}
        </li>
      ) : (
        options.map((option, index) => {
          const isSelected = option.value === value;
          const isHighlighted = index === highlightIndex && !isSelected;

          return (
            <li key={option.value} role="option" aria-selected={isSelected}>
              <button
                type="button"
                onMouseEnter={() => setHighlightIndex(index)}
                onClick={() => selectOption(option.value)}
                className={cn(
                  fontClassName,
                  "w-full px-3 py-2 text-start transition-colors",
                )}
                style={{
                  borderRadius: theme.itemRadius,
                  border: isSelected ? theme.itemSelectedBorder : "1px solid transparent",
                  backgroundColor: isSelected
                    ? theme.itemSelectedBg
                    : isHighlighted
                      ? theme.itemHoverBg
                      : "transparent",
                  color: isSelected ? theme.itemSelectedColor : theme.itemTextColor,
                  fontWeight: isSelected ? 500 : 400,
                  fontSize: theme.fontSize,
                  lineHeight: theme.lineHeight,
                }}
              >
                <span className="block truncate">{option.label}</span>
              </button>
            </li>
          );
        })
      )}
    </ul>
  );

  const menuPanel = open && !isDisabled && (
    <motion.div
      id={listboxId}
      role="listbox"
      initial={reduceMotion ? false : { opacity: 0, y: menuMode === "popover" ? -4 : 0, height: menuMode === "inline" ? 0 : undefined }}
      animate={
        reduceMotion
          ? undefined
          : menuMode === "popover"
            ? { opacity: 1, y: 0 }
            : { height: "auto", opacity: 1 }
      }
      exit={
        reduceMotion
          ? undefined
          : menuMode === "popover"
            ? { opacity: 0, y: -4 }
            : { height: 0, opacity: 0 }
      }
      transition={{ duration: DURATION.fast, ease: EASING.smooth }}
      className={cn(
        menuMode === "popover"
          ? "absolute inset-x-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border"
          : "overflow-hidden",
      )}
      style={
        menuMode === "popover"
          ? {
              backgroundColor: theme.panelBg,
              borderColor: theme.panelBorder,
              boxShadow: theme.panelShadow,
            }
          : undefined
      }
    >
      {optionsList}
    </motion.div>
  );

  return (
    <div ref={rootRef} className={cn("relative w-full min-w-0", className)}>
      {label ? (
        <div className="mb-1.5 text-end text-[12px] leading-4" style={{ color: theme.placeholderColor }}>
          {label}
        </div>
      ) : null}

      <div
        className={cn("transition-shadow", menuMode === "inline" && "overflow-hidden")}
        style={{
          borderRadius: theme.triggerRadius,
          border: triggerBorder,
          boxShadow: triggerShadow,
          backgroundColor: error && variant === "form" ? "rgba(254, 242, 242, 0.5)" : theme.triggerBg,
        }}
      >
        <button
          id={id}
          type="button"
          disabled={isDisabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          dir={dir}
          onBlur={() => {
            if (!open) onBlur?.();
          }}
          onClick={() => {
            if (!isDisabled) toggleMenu();
          }}
          onKeyDown={handleTriggerKeyDown}
          className={cn(
            fontClassName,
            "flex w-full items-center justify-between gap-3 px-3 transition-colors",
            isDisabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
            triggerClassName,
          )}
          style={{
            height: triggerHeight,
            color: hasValue && !isLoading ? theme.triggerText : theme.placeholderColor,
            fontSize: theme.fontSize,
            lineHeight: theme.lineHeight,
            borderBottom: open && menuMode === "inline" ? theme.inlineDivider : "none",
          }}
        >
          <span className="min-w-0 flex-1 truncate text-start">{triggerText}</span>
          {isLoading ? (
            <Loader2
              className="size-[18px] shrink-0 animate-spin"
              style={{ color: theme.chevronOpen }}
            />
          ) : (
            <ChevronDown
              className={cn(
                "size-[18px] shrink-0 transition-transform duration-200",
                open && "rotate-180",
              )}
              style={{ color: open ? theme.chevronOpen : theme.chevronClosed }}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
        </button>

        {menuMode === "inline" ? (
          <AnimatePresence initial={false}>{menuPanel}</AnimatePresence>
        ) : null}
      </div>

      {menuMode === "popover" ? (
        <AnimatePresence initial={false}>{menuPanel}</AnimatePresence>
      ) : null}
    </div>
  );
}
