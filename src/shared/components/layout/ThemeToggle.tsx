"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/shared/components/ui";
import { resolveTheme, useThemeStore } from "@/shared/store/theme.store";

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    const resolved = resolveTheme(theme);
    setTheme(resolved === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
