import express, { Router } from "express";
import { getIndex } from "../controllers/indexController";

const router: Router = express.Router();

router.get("/", getIndex);

export default router;
