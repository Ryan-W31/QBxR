const request = require("supertest");

const app = require("../app");

require("dotenv").config();

// beforeEach(async () => {
//   await mongoose.connect(process.env.MONGODB_URI);
// });

// afterEach(async () => {
//   await mongoose.connection.close();
// });

describe("GET /api/auth/test", () => {
  it("test", async () => {
    const response = await request(app).get("/api/auth/test");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Test");
  });
});
