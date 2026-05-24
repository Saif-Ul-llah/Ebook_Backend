import { NextFunction, Request, Response } from "express";
import { HttpError, Roles } from "../imports";
import { asyncHandler } from "./async";

const checkAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || user.role !== Roles.ADMIN) {
      return next(HttpError.unauthorized("Admin access required"));
    }

    next();
  }
);

export { checkAdmin };
