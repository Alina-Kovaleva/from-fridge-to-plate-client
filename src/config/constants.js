const resolveApiUrl = () => {
  if (typeof process !== "undefined" && process.env) {
    return process.env.VITE_API_URL;
  }

  return undefined;
};

export const apiUrl = resolveApiUrl() || "http://localhost:4000";

export const DEFAULT_MESSAGE_TIMEOUT = 3000;
