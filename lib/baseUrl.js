// lib/baseUrl.js
export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client-side: use relative path
    return "";
  }

  // Vercel deployment URL automatically provided by Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Fallback for local development
  return `http://localhost:3000`;
}
