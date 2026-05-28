import { z } from "zod";
import {
  IRAQI_PHONE_ERROR_MESSAGE,
  isValidIraqiPhone,
  normalizeIraqiPhone,
} from "./phone.utils";

export const signupSchema = z
  .object({
    fullName: z.string().min(1, "الاسم الكامل مطلوب"),
    email: z
      .string()
      .min(1, "البريد الإلكتروني مطلوب")
      .email("يرجى إدخال بريد إلكتروني صالح"),
    phoneNumber: z
      .string()
      .min(1, "رقم الهاتف مطلوب")
      .refine(
        (value) => value.trim().replace(/[\s\-()]/g, "").length >= 10,
        { message: "رقم الهاتف قصير جداً" },
      )
      .transform((value) => normalizeIraqiPhone(value))
      .refine((value) => isValidIraqiPhone(value), {
        message: IRAQI_PHONE_ERROR_MESSAGE,
      }),
    password: z.string().min(8, "يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "يرجى تأكيد كلمة المرور"),
    university: z.string().optional(),
    acceptTerms: z.boolean().refine((value) => value, {
      message: "يجب الموافقة على الشروط والأحكام",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
export type SignupFormInput = z.input<typeof signupSchema>;
