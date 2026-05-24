import { NextFunction, Request, Response } from "express";
import { UserModel, verifyAccessToken } from "../imports";
import { asyncHandler } from "./async";

const optionalToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next();
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return next();
    }

    try {
      const decoded = verifyAccessToken(token) as { [key: string]: any };
      const dbUser = await UserModel.findById(decoded.id);

      if (dbUser) {
        req.user = dbUser;
      }
    } catch (error) {
      // Guest submissions should continue even when an optional token is stale.
    }

    next();
  }
);

export { optionalToken };
