import { Response } from "express";

export const sendRefreshKey = (res: Response, token: string) => {
  res.cookie("habit", token, {
    httpOnly: true,
    path: '/refresh_token'
  });
};
