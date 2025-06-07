import { NextFunction, Request, Response } from "express";
import { CustomError } from "../customError";

export function errorHandler(
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.status) {
    res.status(error.status).json({ msg: error.message });
  } else {
    res.status(500).json({ msg: error.message });
  }
}
