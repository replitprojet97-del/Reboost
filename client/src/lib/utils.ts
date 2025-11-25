import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFileUrl(fileUrl?: string | null): string | undefined {
  if (!fileUrl) return undefined;
  // If it's already a full URL, return as-is
  if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
    return fileUrl;
  }
  // If it's a local filename, prepend the API endpoint
  return `/api/chat/file/${fileUrl}`;
}
