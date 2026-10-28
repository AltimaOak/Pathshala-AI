/**
 * Pathshala AI - Dynamic API Configuration
 * Automatically resolves the correct backend endpoint:
 * - Production / Vercel: uses relative '/api' route (rewritten by vercel.json)
 * - Local development: uses 'http://127.0.0.1:8000'
 */

export const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== "") {
    // If user specified an absolute or relative URL in env
    return envUrl.replace(/\/+$/, ""); // strip trailing slashes
  }

  // When deployed on Vercel / production domain
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1"
  ) {
    return "/api";
  }

  // Local development default
  return "http://127.0.0.1:8000";
};

export const API_BASE_URL = getApiUrl();
export default API_BASE_URL;
