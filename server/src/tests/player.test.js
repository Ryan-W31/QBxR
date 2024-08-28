const request = require("supertest");

const app = require("../app");

require("dotenv").config();

// Test the /api/auth/test route
describe("GET /api/auth/test", () => {
  it("test", async () => {
    const response = await request(app).get("/api/auth/test");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Test");
  });
});
