import { NextFunction, Request, Response } from "express";
import { MOCK_CARDS } from "../mocks/cardsData";
import { stringSchema } from "../validations/primitiveSchemas";
import { CustomError } from "../types/customError";

/**
 * Retrieves all cards or a limited subset
 *
 * @route GET /api/cards
 * @queryParam limit - Optional limit of cards to be returned
 *
 * @returns { Array<Card> } - 200 List of cards
 */
export function getCards(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const limitParam = req.query.limit;

  if (limitParam === undefined) {
    res.status(200).json(MOCK_CARDS);

    return;
  }

  const stringLimitParam = stringSchema.safeParse(limitParam);

  if (stringLimitParam.success) {
    const intParsedLimit = parseInt(stringLimitParam.data);

    if (!isNaN(intParsedLimit) && intParsedLimit > 0) {
      res.status(200).json(MOCK_CARDS.slice(0, intParsedLimit));
    }
  }

  res.status(200).json(MOCK_CARDS);
}

/**
 * Retrieves a single card based on the provided id
 *
 * @route GET /api/cards/:id
 *
 * @returns { Card } - 200 A card
 */
export function getCard(req: Request, res: Response, next: NextFunction): void {
  const id = parseInt(req.params.id);
  const foundCard = MOCK_CARDS.find((card) => card.id === id);

  if (!foundCard) {
    const error: CustomError = {
      message: `Card with id ${id} was not found`,
      status: 404,
    };

    return next(error);
  }

  res.status(200).json(foundCard);
}

/**
 * Creates new card
 *
 * @route POST /api/cards
 *
 * @returns { Array<Card> } - 200 List of cards, including the created card
 */
export function createCard(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const card = { id: MOCK_CARDS.length + 1, title: req.body?.title };

  if (!card.title) {
    const error: CustomError = {
      message: "Please include a title",
      status: 400,
    };

    return next(error);
  }

  MOCK_CARDS.push(card);
  res.status(201).json(MOCK_CARDS);
}

/**
 * Updates a card title
 *
 * @route PUT /api/cards/:id
 *
 * @returns { Array<Card> } - 200 List of cards, including the updated card
 */
export function updateCard(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = parseInt(req.params.id);
  const foundCard = MOCK_CARDS.find((card) => card.id === id);

  if (!foundCard) {
    const error: CustomError = {
      message: `Card with id ${id} was not found`,
      status: 404,
    };

    return next(error);
  }

  foundCard!.title = req.body.title;
  res.status(200).json(MOCK_CARDS);
}

/**
 * Deletes a card
 *
 * @route DELETE /api/cards/:id
 *
 * @returns { Array<Card> } - 200 List of cards, after the deleted card is removed
 */
export function deleteCard(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const id = parseInt(req.params.id);
  const foundCard = MOCK_CARDS.find((card) => card.id === id);

  if (!foundCard) {
    const error: CustomError = {
      message: `Card with id ${id} was not found`,
      status: 404,
    };

    return next(error);
  }

  res.status(200).json(MOCK_CARDS.filter((card) => card.id !== id));
}
