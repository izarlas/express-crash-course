import express, { Request, Response, Router } from "express";
import { MOCK_CARDS } from "../mocks/cards-data";
import { stringSchema } from "../validations/primitiveSchemas";

const router: Router = express.Router();

// Get all cards
router.get("/", (req: Request, res: Response) => {
  const limitParam = req.query.limit;

  if (limitParam === undefined) {
    res.status(200).json(MOCK_CARDS);
  }

  const stringLimitParam = stringSchema.safeParse(limitParam);

  if (stringLimitParam.success) {
    const intParsedLimit = parseInt(stringLimitParam.data);

    if (!isNaN(intParsedLimit) && intParsedLimit > 0) {
      res.status(200).json(MOCK_CARDS.slice(0, intParsedLimit));
    }
  }

  res.status(200).json(MOCK_CARDS);
});

// Get single card (by id)
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const foundCard = MOCK_CARDS.find((card) => card.id === id);

  if (!foundCard)
    res.status(404).json({ msg: `Card with id ${id} was not found` });

  res.status(200).json(foundCard);
});

// Create new card
router.post("/", (req: Request, res: Response) => {
  const newCard = { id: MOCK_CARDS.length + 1, title: req.body.title };

  if (!newCard.title) {
    res.status(400).json({ msg: "Please include a title" });
  }

  res.status(201).json(MOCK_CARDS);
});

// Update card (by id)
router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const foundCard = MOCK_CARDS.find((card) => card.id === id);

  if (!foundCard) {
    res.status(404).json({ msg: `Card with id ${id} was not found` });
  }

  foundCard!.title = req.body.title;
  res.status(200).json(MOCK_CARDS);
});

// Delete card (by id)
router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const foundCard = MOCK_CARDS.find((card) => card.id === id);

  if (!foundCard) {
    res.status(404).json({ msg: `Card with id ${id} was not found` });
  }

  res.status(200).json(MOCK_CARDS.filter((card) => card.id !== id));
});

export default router;
