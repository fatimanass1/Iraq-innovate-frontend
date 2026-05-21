export type ThemeMode = "light" | "dark" | "system";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export type Nullable<T> = T | null;
