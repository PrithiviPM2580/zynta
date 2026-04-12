import jwt from "jsonwebtoken";
import type { Response } from "express";
import { Env } from "../config/env.config";

type Time = `${number}${"s" | "m" | "h" | "d"}`;
type Cookie = {
  res: Response;
  userId: string;
};

export const setJwtAuthCookie = ({ res, userId }: Cookie) => {
  const payload = { userId };
  const expiresIn = Env.JWT_EXPIRES_IN as Time;
  const token = jwt.sign(payload, Env.JWT_SECRET, {
    expiresIn: expiresIn || "7d",
    audience: ["user"],
  });
  return res.cookie("accessToken", token, {
    httpOnly: true,
    secure: Env.NODE_ENV === "production" ? true : false,
    sameSite: Env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const clearJwtAuthCookie = (res: Response) => {
  return res.clearCookie("accessToken", {
    httpOnly: true,
    secure: Env.NODE_ENV === "production" ? true : false,
    sameSite: Env.NODE_ENV === "production" ? "strict" : "lax",
  });
};
