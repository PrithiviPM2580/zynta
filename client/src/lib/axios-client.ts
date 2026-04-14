import axios from "axios";
import { appEnv } from "./env";

export const API = axios.create({
  baseURL: appEnv.NODE_ENV === "development" ? `${appEnv.API_URL}/api` : "/api",

  withCredentials: true,
});
