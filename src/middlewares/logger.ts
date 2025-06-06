import { NextFunction, Request, Response, Router } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
}
