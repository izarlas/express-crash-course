import express, { NextFunction, Request, Response, Router } from "express";
import { MOCK_CARDS } from "../mocks/cards-data";
import { stringSchema } from "../validations/primitiveSchemas";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const limitParam = req.query.limit;

  if (limitParam === undefined) {
    return res.status(200).json(MOCK_CARDS);
  }

  const stringLimitParam = stringSchema.safeParse(limitParam);

  if (!stringLimitParam.success) {
    throw new Error(`Limit param ${limitParam} is not a string!`);
  }

  const intParsedLimit = parseInt(stringLimitParam.data);

  if (!isNaN(intParsedLimit) && intParsedLimit > 0) {
    return res.status(200).json(MOCK_CARDS.slice(0, intParsedLimit));
  }

  return res.status(200).json(MOCK_CARDS);
});

router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const foundCard = MOCK_CARDS.find((card) => card.id === id);

  if (!foundCard)
    return res.status(404).json({ msg: `Card with id ${id} was not found` });

  return res.status(200).json(foundCard);
});

export default router;
