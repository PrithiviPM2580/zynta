import axios from "axios";

export const API = axios.create({
  baseURL:
    import.meta.env.NODE_ENV === "development"
      ? `${import.meta.env.VITE_API_URL}/api`
      : "/api",

  withCredentials: true,
});
