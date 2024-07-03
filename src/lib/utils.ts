import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const allowedEmailProviders = [
  "gmail.com",
  "outlook.com",
  "yahoo.com",
  "protonmail.com",
  "aol.com",
  "zoho.com",
  "icloud.com",
  "gmx.com",
  "hotmail.com",
  "yandex.ru",
  "mail.ru",
  "libero.it",
  "uol.com.br",
  "bol.com.br",
  "cox.net",
  "sbcglobal.net",
  "verizon.net",
  "googlemail.com",
  "bigpond.com",
  "terra.com.br",
];
