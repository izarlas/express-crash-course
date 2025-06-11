import request from "supertest";
import { MOCK_CARDS } from "../../../src/mocks/cardsData";
import { app } from "../../../src/server";

const cardsApiUrl = "/api/cards";
const requestHeadersJson = "application/json";

describe("cards apis", () => {
  describe("getCards", () => {
    it("retrieves all cards when the limit query param is a negative number", async () => {
      const res = await request(app).get(`${cardsApiUrl}?limit=-1`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(MOCK_CARDS);
    });

    it("retrieves all cards when the limit query param is non-numeric string", async () => {
      const res = await request(app).get(`${cardsApiUrl}?limit=abc`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(MOCK_CARDS);
    });

    it("retrieves all cards when the limit query param is empty string string", async () => {
      const res = await request(app).get(`${cardsApiUrl}?limit=`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(MOCK_CARDS);
    });

    it("retrieves all cards when the limit query param is not specified", async () => {
      const res = await request(app).get(`${cardsApiUrl}`);
      const foundCards = res.body;

      expect(res.status).toBe(200);
      expect(Array.isArray(foundCards)).toBe(true);
      expect(foundCards).toEqual(MOCK_CARDS);
    });

    it("retrieves the amount of cards set by the limit query param", async () => {
      const res = await request(app).get(`${cardsApiUrl}?limit=2`);
      const foundCards = res.body;

      expect(res.status).toBe(200);
      expect(Array.isArray(foundCards)).toBe(true);
      expect(foundCards.length).toBe(2);
      expect(foundCards).toEqual([MOCK_CARDS[0], MOCK_CARDS[1]]);
    });

    it("retrieves the maximum amount of cards exceeding the limit query param", async () => {
      const res = await request(app).get(`${cardsApiUrl}?limit=20`);

      const foundCards = res.body;
      expect(res.status).toBe(200);
      expect(Array.isArray(foundCards)).toBe(true);
      expect(foundCards).toEqual(MOCK_CARDS);
    });
  });

  describe("getCard", () => {
    it("retrieves a card by id", async () => {
      const res = await request(app).get(`${cardsApiUrl}/1`);

      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(MOCK_CARDS[0]);
    });
    it("gets custom error message and 404 status code when card id is not found", async () => {
      const res = await request(app).get(`${cardsApiUrl}/20`);

      expect(res.status).toBe(404);
      expect(res.body).toStrictEqual({ msg: "Card with id 20 was not found" });
    });
  });

  describe("createCard", () => {
    it("creates a new card and returns 201 status code with all cards", async () => {
      const newCard = { title: "Card 5" };
      const res = await request(app)
        .post(cardsApiUrl)
        .send(newCard)
        .set("Accepts", requestHeadersJson);

      expect(res.status).toBe(201);
      expect(res.body).toStrictEqual(MOCK_CARDS);
    });

    it("gets custom error message and 400 status code when card does not include a title", async () => {
      const newCard = { title: "" };
      const res = await request(app)
        .post(cardsApiUrl)
        .send(newCard)
        .set("Accepts", requestHeadersJson);

      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({ msg: "Please include a title" });
    });
  });

  describe("updateCard", () => {
    it("updates existing card by id and returns 200 status code", async () => {
      const newCardTitle = { title: "Updated title" };
      const cardId = 1;
      const res = await request(app)
        .put(`${cardsApiUrl}/${cardId}`)
        .send(newCardTitle)
        .set("Accepts", requestHeadersJson);

      const updatedCard = {
        id: cardId,
        ...newCardTitle,
      };
      const foundCardFromResponse = res.body.find(
        (card: { id: number; title: string }) => card.id === updatedCard.id
      );

      expect(res.status).toBe(200);
      expect(foundCardFromResponse).toStrictEqual(updatedCard);
    });
    it("gets custom error message and 404 status code when card id is not found", async () => {
      const res = await request(app)
        .put(`${cardsApiUrl}/20`)
        .send({ title: "" })
        .set("Accepts", requestHeadersJson);

      expect(res.status).toBe(404);
      expect(res.body).toStrictEqual({ msg: "Card with id 20 was not found" });
    });
  });

  describe("deleteCard", () => {
    it("deletes a card by id and returns 200 status code and updated card list", async () => {
      const res = await request(app).delete(`${cardsApiUrl}/1`);

      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual(
        MOCK_CARDS.filter((card) => card.id !== 1)
      );
    });
    it("gets custom error message and 404 status code when card id is not found", async () => {
      const res = await request(app).delete(`${cardsApiUrl}/20`);

      expect(res.status).toBe(404);
      expect(res.body).toStrictEqual({
        msg: "Card with id 20 was not found",
      });
    });
  });
});
