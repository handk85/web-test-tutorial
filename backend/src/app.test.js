import supertest from "supertest";
import app from "./app";

let server = {};
let request = {};

beforeEach(async () => {
  server = app.listen();
  request = supertest(server);
  await request.get("/flush"); // http://localhost:3001/flush
});

afterEach(async () => {
  await server.close();
});

describe("Add API test", () => {
  test("AddItem Test", async () => {
    const item = { title: "Test title", content: "Hello world!" };
    const response = await request
      .post("/add")
      .send(item)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Success");
  });

  test("Item is missing", async () => {
    const response = await request
      .post("/add")
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.text).toBe("No item to add");
  });
});
