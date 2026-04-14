type RuntimeEnv = Record<string, string | undefined>;

const env = (import.meta as ImportMeta & { env?: RuntimeEnv }).env ?? {};
const processEnv =
  typeof process !== "undefined" ? ((process.env ?? {}) as RuntimeEnv) : {};

const mode =
  env.MODE ?? env.VITE_NODE_ENV ?? processEnv.NODE_ENV ?? "development";
const isDev = mode !== "production";
const apiUrl =
  env.VITE_API_URL ??
  processEnv.VITE_API_URL ??
  (isDev ? "http://localhost:5000" : undefined);

export const appEnv = {
  env,
  mode,
  isDev,
  apiUrl,
};
