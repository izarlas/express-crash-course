import express, { Router } from "express";
import {
  createCard,
  deleteCard,
  getCard,
  getCards,
  updateCard,
} from "../controllers/cardsController";

const router: Router = express.Router();

router.get("/", getCards);
router.get("/:id", getCard);
router.post("/", createCard);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

export default router;
