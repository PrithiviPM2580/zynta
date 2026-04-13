import axios from "axios";
import { appEnv } from "./env";

export const API = axios.create({
  baseURL: appEnv.isDev && appEnv.apiUrl ? `${appEnv.apiUrl}/api` : "/api",

  withCredentials: true,
});
