import request from "supertest";
import { app } from "../../../src/server";

describe("index api", () => {
  it("fetches index.html", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.type).toBe("text/html");
  });
});
