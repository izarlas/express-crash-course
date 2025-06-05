import express from "express";
import { pages, rootPath } from "../constants";
import path from "path";

export const staticMiddleware = express.static(path.join(rootPath, pages));
