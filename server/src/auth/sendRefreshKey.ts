import { Response } from "express";
import { __prod__ } from "../constants";

export const sendRefreshKey = (res: Response, token: string) => {
  res.cookie("habit", token, {
    maxAge: 6.048e8, // 7 days
    httpOnly: true,
    path: "/",
    sameSite: __prod__ ? "none" : "lax",
    secure: __prod__, // cookie only works in https
    domain: process.env.SERVER_DOMAIN,
  });
};
