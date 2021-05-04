import { sign } from "jsonwebtoken";
import { Users } from "../Entities/Users";

export const createAccessKey = (user: Users) => {
  return sign(
    {
      userId: user.id,
    },
    process.env.ACCESS_KEY!,
    {
      expiresIn: "15m",
    }
  );
};

export const createRefreshKey = (user: Users) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_KEY!,
    {
      expiresIn: "7d",
    }
  );
};
