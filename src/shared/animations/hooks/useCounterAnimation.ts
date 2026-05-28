"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { DURATION, EASING } from "../constants";

export type ParsedCounterValue = {
  prefix: string;
  numericValue: number;
  suffix: string;
  decimals: number;
};

export function parseCounterDisplayValue(value: string | number): ParsedCounterValue {
  if (typeof value === "number") {
    return {
      prefix: "",
      numericValue: value,
      suffix: "",
      decimals: Number.isInteger(value) ? 0 : 1,
    };
  }

  const match = value.trim().match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);

  if (!match) {
    return { prefix: "", numericValue: 0, suffix: value, decimals: 0 };
  }

  const [, prefix = "", numericPart = "0", suffix = ""] = match;
  const decimals = numericPart.includes(".") ? numericPart.split(".")[1]?.length ?? 1 : 0;

  return {
    prefix,
    numericValue: Number.parseFloat(numericPart),
    suffix,
    decimals,
  };
}

export type UseCounterAnimationOptions = {
  duration?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
  enabled?: boolean;
};

export function useCounterAnimation(
  target: string | number,
  options: UseCounterAnimationOptions = {},
) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = parseCounterDisplayValue(target);
  const {
    duration = DURATION.counter,
    delay = 0,
    once = true,
    amount = 0.35,
    enabled = true,
  } = options;

  const isInView = useInView(ref, { once, amount });
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? parsed.numericValue : 0);

  useEffect(() => {
    if (!enabled) {
      setDisplayValue(parsed.numericValue);
      return;
    }

    if (shouldReduceMotion) {
      setDisplayValue(parsed.numericValue);
      return;
    }

    if (!isInView) {
      return;
    }

    motionValue.set(0);
    setDisplayValue(0);

    const controls = animate(motionValue, parsed.numericValue, {
      duration,
      delay,
      ease: EASING.smooth,
    });

    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [
    delay,
    duration,
    enabled,
    isInView,
    motionValue,
    parsed.numericValue,
    shouldReduceMotion,
  ]);

  const formattedValue =
    parsed.decimals > 0
      ? displayValue.toFixed(parsed.decimals)
      : String(Math.round(displayValue));

  return {
    ref,
    text: `${parsed.prefix}${formattedValue}${parsed.suffix}`,
    isAnimating: enabled && isInView && !shouldReduceMotion,
  };
}
