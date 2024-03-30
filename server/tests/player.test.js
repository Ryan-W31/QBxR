const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

require("dotenv").config();

// beforeEach(async () => {
//   await mongoose.connect(process.env.MONGODB_URI);
// });

// afterEach(async () => {
//   await mongoose.connection.close();
// });

describe("GET /api/player", () => {
  it("test", async () => {
    const response = await request(app).get("/api/player");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
