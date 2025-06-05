import { Router, Response } from "express";
import { pages, rootPath } from "../constants";
import path from "path";

const router = Router();

router.get("/", (_, res: Response) => {
  res.send("You found home");
});

router.get("/h1tag", (_, res: Response) => {
  res.send("<h1>H1Tag</h1>");
});

router.get("/json", (_, res: Response) => {
  res.send({ message: "Json response" });
});

router.get("/index", (_, res: Response) => {
  res.sendFile(path.join(rootPath, pages, "index.html"));
});

export default router;
