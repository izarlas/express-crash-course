import { Router, Response } from "express";
import { pages, rootPath } from "../constants";
import path from "path";

const homeRouter = Router();

homeRouter.get("/", (_, res: Response) => {
  res.send("You found home");
});

homeRouter.get("/h1tag", (_, res: Response) => {
  res.send("<h1>H1Tag</h1>");
});

homeRouter.get("/json", (_, res: Response) => {
  res.send({ message: "Json response" });
});

homeRouter.get("/index", (_, res: Response) => {
  res.sendFile(path.join(rootPath, pages, "index.html"));
});

homeRouter.get("/contact", (_, res: Response) => {
  res.sendFile(path.join(rootPath, pages, "contact.html"));
});

export default homeRouter;
