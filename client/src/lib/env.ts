type RuntimeEnv = Record<string, string | undefined>;

const env = (import.meta as ImportMeta & { env?: RuntimeEnv }).env ?? {};

const mode = env.MODE ?? env.VITE_NODE_ENV ?? "production";
const isDev = mode === "development";
const apiUrl = env.VITE_API_URL;

export const appEnv = {
  env,
  mode,
  isDev,
  apiUrl,
};
