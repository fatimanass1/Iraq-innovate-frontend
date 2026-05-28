import { z } from "zod";
import { isValidIraqiPhone, normalizeIraqiPhone } from "@/features/auth/validation/phone.utils";

export const settingsSchema = z.object({
  fullName: z
    .string()
    .min(2, "الاسم يجب أن يكون حرفين على الأقل")
    .max(80, "الاسم طويل جداً"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phoneNumber: z
    .string()
    .min(1, "رقم الهاتف مطلوب")
    .transform((value) => normalizeIraqiPhone(value))
    .refine((value) => isValidIraqiPhone(value), {
      message: "يرجى إدخال رقم هاتف عراقي صالح",
    }),
  newsLetterSubscription: z.boolean(),
});

export type SettingsSchemaValues = z.infer<typeof settingsSchema>;
