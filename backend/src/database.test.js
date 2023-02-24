import { listItems, addItem, getItem, flushItems } from "./database";

describe("addItem method tests", () => {
  test("addItem test - success", async () => {
    const item = {
      title: "Hello world",
      content: "sdkaljfsdakjfdsakfedjwskl;fased",
    };
    const response = await addItem({
      request: {
        body: item,
      },
    });

    expect(response).toBe("Success");
    const list = JSON.parse(await listItems({}));
    expect(list.length).toBe(1);
  });

  test("item is missing", async () => {
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

  test("Item is given, but title is missing ", async () => {
    const ctx = {
      request: {
        body: {
          abc: "dsaklfjdskajfdsak",
          content: "djkslajfkldsjfkslaj",
        },
      },
      throw: jest.fn(() => {
        throw new Error("Test error");
      }),
    };

    try {
      await addItem(ctx);
    } catch (e) {}

    expect(ctx.throw).toBeCalledWith(400, "Please check the item format");
  });

  test("Item is given, but content is missing ", async () => {
    const ctx = {
      request: {
        body: {
          title: "dsaklfjdskajfdsak",
          abasddfsa: "djkslajfkldsjfkslaj",
        },
      },
      throw: jest.fn(() => {
        throw new Error("Test error");
      }),
    };

    try {
      await addItem(ctx);
    } catch (e) {}

    expect(ctx.throw).toBeCalledWith(400, "Please check the item format");
  });
});
