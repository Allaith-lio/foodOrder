import { z } from "zod";

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function normalizePhoneDigits(value) {
  let digits = String(value ?? "")
    .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)))
    .replace(/\D/g, "");

  if (digits.startsWith("00963")) digits = "0" + digits.slice(5);
  else if (digits.startsWith("963")) digits = "0" + digits.slice(3);

  return digits.slice(0, 10);
}

export const usernameSchema = z
  .string()
  .trim()
  .min(1, "This field is required.")
  .regex(
    /^[\p{L}][\p{L}\s'-]{1,29}$/u,
    "Name must be 2–30 letters (spaces, - and ' allowed)."
  );

export const emailSchema = z
  .string()
  .trim()
  .min(1, "This field is required.")
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Enter a valid email like you@example.com.");

export const registerPasswordSchema = z
  .string()
  .min(1, "This field is required.")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/,
    "Password needs 8+ characters with upper, lower case and a number."
  );

export const loginPasswordSchema = z
  .string()
  .min(1, "This field is required.");

export const syrianPhoneSchema = z.preprocess(
  normalizePhoneDigits,
  z
    .string()
    .min(1, "This field is required.")
    .regex(/^09\d{8}$/, "Enter a valid Syrian number: 09XXXXXXXX (10 digits).")
);
export const checkoutSchema = z.object({
  streetAddress: z
    .string()
    .trim()
    .min(5, "Enter a valid street address (5–100 characters).")
    .max(100, "Enter a valid street address (5–100 characters)."),
  aptFloor: z.string().trim().max(80).optional().or(z.literal("")),
  deliveryNotes: z.string().trim().max(250).optional().or(z.literal("")),
  phone: syrianPhoneSchema,
});

export const locationSchema = z.object({
  area: z.string().trim().max(80).optional().or(z.literal("")),
  street: z.string().trim().max(120).optional().or(z.literal("")),
  details: z.string().trim().max(250).optional().or(z.literal("")),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
});

export const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: registerPasswordSchema,
  avatar: z.string().optional(),
});

const optionalSyrianPhoneSchema = z.preprocess(
  normalizePhoneDigits,
  z.union([
    z.literal(""),
    z
      .string()
      .regex(/^09\d{8}$/, "Enter a valid Syrian number: 09XXXXXXXX (10 digits)."),
  ])
);

export const profileSchema = z.object({
  name: usernameSchema,
  email: emailSchema,
  phone: optionalSyrianPhoneSchema,
  avatar: z.string().optional(),
});

export const addressSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "This field is required.")
    .max(40, "Keep the label under 40 characters."),
  fullName: usernameSchema,
  address: z
    .string()
    .trim()
    .min(5, "Enter a valid street address (5–120 characters).")
    .max(120, "Enter a valid street address (5–120 characters)."),
  city: z
    .string()
    .trim()
    .min(1, "This field is required.")
    .max(80, "Keep the city under 80 characters."),
  region: z.string().trim().max(80).optional().or(z.literal("")),
  country: z
    .string()
    .trim()
    .min(1, "This field is required.")
    .max(80, "Keep the country under 80 characters."),
  phone: optionalSyrianPhoneSchema,
});

export const cardSchema = z.object({
  holder: usernameSchema,
  number: z.preprocess(
    (value) => String(value ?? "").replace(/\D/g, ""),
    z
      .string()
      .min(1, "This field is required.")
      .regex(/^\d{12,19}$/, "Enter a valid card number (12–19 digits).")
  ),
  expiry: z.string().min(1, "This field is required."),
});

export const passwordVerifySchema = z.object({
  password: loginPasswordSchema,
});