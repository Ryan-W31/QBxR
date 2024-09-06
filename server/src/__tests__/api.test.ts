import request from "supertest";
import { describe, test } from "@jest/globals";
import app from "../app";

// Health Check
describe("GET /", () => {
  test("It should respond with status 200 and status: healthy", async () => {
    return request(app).get("/").expect(200, { status: "healthy" });
  });
});
