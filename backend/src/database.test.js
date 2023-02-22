import { listItems, addItem, getItem, flushItems } from "./database";

describe("addItem function tests", () => {
  test("addItem test", async () => {
    const item = { title: "Test title", content: "Hello world!" };
    const ctx = {
      request: {
        body: item,
      },
    };
    const response = await addItem(ctx);
    expect(response).toBe("Success");

    const list = JSON.parse(await listItems({}));
    expect(list.length).toBe(1);
  });

  test("Item is missing", async () => {
    const ctx = {
      throw: jest.fn(() => {
        throw new Error("Test error");
      }),
    };

    try {
      await addItem(ctx);
    } catch (e) {}
    expect(ctx.throw).toBeCalledWith(400, "No item to add");
  });
});
