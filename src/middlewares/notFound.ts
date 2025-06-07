import { Request, Response, NextFunction } from "express";
import { CustomError } from "../customError";

export function notFound(req: Request, res: Response, next: NextFunction) {
  const error: CustomError = {
    message: "Not found!",
    status: 404,
  };

  next(error);
}
