/* global __API_URL__ */

let warnedAboutFallback = false;
const fallbackApiUrl = "http://localhost:4000";

const resolveApiUrl = () => {
  if (typeof __API_URL__ !== "undefined" && __API_URL__) {
    return __API_URL__;
  }

  if (typeof process !== "undefined" && process.env) {
    return process.env.VITE_API_URL;
  }

  if (!warnedAboutFallback && typeof console !== "undefined") {
    console.warn(
      "VITE_API_URL is not set; falling back to local API at",
      fallbackApiUrl
    );
    warnedAboutFallback = true;
  }

  return fallbackApiUrl;
};

export const apiUrl = resolveApiUrl();

export const DEFAULT_MESSAGE_TIMEOUT = 3000;
