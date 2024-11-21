import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_ClIENT_ID2 || "";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const client = createThirdwebClient({
  clientId: clientId,
});

