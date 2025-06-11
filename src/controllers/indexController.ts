import { NextFunction, Request, Response } from "express";
import path from "path";

/**
 * Servers the static index.html file to the client
 * that contains a simple form to create and retrieve cards
 *
 * @route GET /
 *
 * @returns { HTML } index.html
 */
export function getIndex(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.sendFile(path.join(__dirname, "src", "public", "index.html"));
}
