import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"; // optional, but useful

// merge Tailwind classes smartly
export function cn(...inputs: (string | undefined | null | Record<string, boolean>)[]): string {
    return twMerge(clsx(inputs));
}
