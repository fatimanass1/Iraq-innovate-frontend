import { z } from "zod";
import { isValidIraqiPhone } from "./phone.utils";

function isEmailOrIraqiPhone(value: string): boolean {
  const trimmed = value.trim();
  return z.string().email().safeParse(trimmed).success || isValidIraqiPhone(trimmed);
}

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني أو رقم الهاتف مطلوب")
    .refine(isEmailOrIraqiPhone, {
      message: "يرجى إدخال بريد إلكتروني أو رقم هاتف عراقي صالح",
    }),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
  rememberMe: z.boolean(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
