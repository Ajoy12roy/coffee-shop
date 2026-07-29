import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function generateStars(rating: number): string {
  return "★".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "");
}
