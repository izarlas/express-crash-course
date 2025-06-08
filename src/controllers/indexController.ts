import { NextFunction, Request, Response } from "express";
import path from "path";

export function getIndex(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.sendFile(path.join(__dirname, "src", "public", "index.html"));
}
