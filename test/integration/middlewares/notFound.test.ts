import request from "supertest";
import { app } from "../../../src/server";

describe("notFound middleware", () => {
  it("ensures next returns CustomError with message 'Not found!' and status code 404", async () => {
    const res = await request(app).get("/api/unknown/path");

    expect(res.status).toBe(404);
    expect(res.body).toStrictEqual({ msg: "Not found!" });
  });
});
