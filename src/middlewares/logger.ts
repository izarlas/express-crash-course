import { NextFunction, Request, Response } from "express";
import colors from "colors";

export function logger(req: Request, res: Response, next: NextFunction) {
  const requestMethod = req.method;
  console.log(
    setMessageColor(
      `${requestMethod} ${req.protocol}://${req.get("host")}${req.originalUrl}`,
      requestMethod
    )
  );
  next();
}

function setMessageColor(message: string, method: string): string {
  const requestsColorsMap: Record<string, keyof typeof colors> = {
    GET: "green",
    POST: "yellow",
    PUT: "blue",
    DELETE: "red",
  };

  const color = requestsColorsMap[method] || "white";
  return (colors[color] as (msg: string) => string)(message);
}
