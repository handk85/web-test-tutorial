import supertest from "supertest";
import app from "./app";

let server = {};
let request = {};

beforeEach(async () => {
  server = app.listen();
  request = supertest(server);
  await request.get("/flush");
});

afterEach(async () => {
  await server.close();
});

describe("ListAPI", () => {
  test("List test", async () => {
    const response = await request.get("/list");
    expect(response.status).toBe(200);
    expect(response.text).toBe("[]");
  });

  test("Add Multiple Items and Get List", async () => {
    let response = await request.get("/list");
    expect(response.status).toBe(200);
    expect(response.text).toBe("[]");

    const num_iteration = 5;
    [...Array(num_iteration).keys()].map(async (i) => {
      const item = { title: `Item ${i}`, content: `Content ${i}` };
      await request
        .post("/add")
        .send(item)
        .set("Content-Type", "application/json");
    });

    response = await request.get("/list");
    expect(response.status).toBe(200);
    const response_obj = JSON.parse(response.text);
    expect(response_obj.length).toEqual(num_iteration);
    [...Array(num_iteration).keys()].map(async (i) => {
      const test_obj = response_obj[i];
      expect(test_obj.title).toBe(`Item ${i}`);
      expect(test_obj.content).toBe(`Content ${i}`);
    });
  });
});

describe("AddAPI", () => {
  test("AddItem Test", async () => {
    const item = { title: "Test title", content: "Hello world!" };
    const response = await request
      .post("/add")
      .send(item)
      .set("Content-Type", "application/json");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Success");
  });

  test("Title is missing", async () => {
    const broken_item = { a: "test", content: "cannot pass" };
    const response = await request
      .post("/add")
      .send(broken_item)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.text).toBe("Please check the item format");
  });

  test("Content is missing", async () => {
    const broken_item = { title: "test", b: "cannot pass" };
    const response = await request
      .post("/add")
      .send(broken_item)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.text).toBe("Please check the item format");
  });
});

describe("GetItem API", () => {
  test("GetItem Test", async () => {
    const item = { title: "Test title", content: "Hello world!" };
    await request
      .post("/add")
      .send(item)
      .set("Content-Type", "application/json");

    const response = await request.get("/item").query({ id: "0" });
    const obj = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(obj.title).toBe(item.title);
    expect(obj.content).toBe(item.content);
  });

  test("GetItem with missing id", async () => {
    const response = await request.get("/item");
    expect(response.status).toBe(400);
    expect(response.text).toEqual("Please specify id");
  });

  test("GetItem with unknown id", async () => {
    const response = await request.get("/item").query({ id: "unknown" });
    expect(response.status).toBe(400);
    expect(response.text).toEqual("Item cannot be found");
  });
});
