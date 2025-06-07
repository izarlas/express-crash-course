import express from "express";
import cards from "../../src/apis/cards";
import request from "supertest";
import { MOCK_CARDS } from "../../src/mocks/cardsData";

const app = express();
describe("cards apis", () => {
  beforeAll(() => {
    app.use("/api/cards", cards);
  });

  describe("GET cards", () => {
    // TODO test potential errors e.g.  if (!isNaN(intParsedLimit) && intParsedLimit > 0) {

    it("retrieves all cards when the limit query param is a negative number", async () => {
      const res = await request(app).get("/api/cards?limit=-1");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(MOCK_CARDS);
    });

    it("retrieves all cards when the limit query param is non-numeric string", async () => {
      const res = await request(app).get("/api/cards?limit=abc");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(MOCK_CARDS);
    });

    it("retrieves all cards when the limit query param is empty string string", async () => {
      const res = await request(app).get("/api/cards?limit=");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(MOCK_CARDS);
    });

    it("retrieves all cards when the limit query param is not specified", async () => {
      const res = await request(app).get("/api/cards");

      const foundCards = res.body;
      expect(res.status).toBe(200);
      expect(Array.isArray(foundCards)).toBe(true);
      expect(foundCards).toEqual(MOCK_CARDS);
    });

    it("retrieves the amount of cards set by the limit query param", async () => {
      const res = await request(app).get("/api/cards?limit=2");

      const foundCards = res.body;
      expect(res.status).toBe(200);
      expect(Array.isArray(foundCards)).toBe(true);
      expect(foundCards.length).toBe(2);
      expect(foundCards).toEqual([MOCK_CARDS[0], MOCK_CARDS[1]]);
    });

    it("retrieves the maximum amount of cards exceeding the limit query param", async () => {
      const res = await request(app).get("/api/cards?limit=20");

      const foundCards = res.body;
      expect(res.status).toBe(200);
      expect(Array.isArray(foundCards)).toBe(true);
      expect(foundCards).toEqual(MOCK_CARDS);
    });

    // it("", () => {});
  });

  describe("GET card by id", () => {
    it("retrieves a card by id", async () => {});
    it("retrieves custom error message and status code when card id is not found", async () => {});
  });

  describe("createCard", () => {});
  describe("updateCard", () => {});
  describe("deleteCard", () => {});
});
