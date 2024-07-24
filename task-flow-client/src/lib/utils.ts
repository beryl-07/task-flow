import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(date: Date | string | number,
                               opts: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat("fr", {
    dateStyle: "medium",
    timeStyle: "short",
    ...opts,
  }).format(new Date(date))
}