import { Server } from "./../imports";
import type { IUser } from "../models";

declare global {
  namespace Express {
    interface Request {
      io?: Server;
      user: IUser;
    }
  }
}
