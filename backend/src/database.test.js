import { listItems, addItem, getItem, flushItems } from "./database";

beforeEach(async () => {
  await flushItems({});
});

describe("listItems function", () => {
  test("Get empty list test", async () => {
    const ctx = {
      throw: jest.fn(() => {
        throw new Error("Error");
      }),
    };

    try {
      await listItems(ctx);
    } catch (e) {}

    expect(ctx.throw).toBeCalledWith(400, "No items found");
  });

  test("Add Multiple Items and Get List", async () => {
    const num_iteration = 5;
    [...Array(num_iteration).keys()].map(async (i) => {
      await addItem({
        request: {
          body: {
            title: `Test title ${i}`,
            content: `Test content ${i}`,
          },
        },
      });
    });

    const response = JSON.parse(await listItems({}));
    expect(response.length).toEqual(num_iteration);
    [...Array(num_iteration).keys()].map(async (i) => {
      const test_obj = response[i];
      expect(test_obj.title).toBe(`Test title ${i}`);
      expect(test_obj.content).toBe(`Test content ${i}`);
    });
  });
});

describe("AddItem function", () => {
  test("AddItem Test", async () => {
    const item = { title: "Test title", content: "Hello world!" };
    const response = await addItem({
      request: {
        body: item,
      },
    });
    expect(response).toBe("Success");
    const list = JSON.parse(await listItems({}));
    expect(list.length).toBe(1);
  });

  test("Item is missing", async () => {
    const ctx = {
      throw: jest.fn(() => {
        throw new Error("Error");
      }),
    };
    try {
      await addItem(ctx);
    } catch (e) {}
    expect(ctx.throw).toBeCalledWith(400, "No item to add");
  });

  test("Title is missing", async () => {
    const broken_item = { a: "test", content: "cannot pass" };
    const ctx = {
      request: { body: broken_item },
      throw: jest.fn(() => {
        throw new Error("Error");
      }),
    };

    try {
      await addItem(ctx);
    } catch (e) {}

    expect(ctx.throw).toBeCalledWith(400, "Please check the item format");
  });

  test("Content is missing", async () => {
    const broken_item = { title: "test", b: "cannot pass" };
    const ctx = {
      request: { body: broken_item },
      throw: jest.fn(() => {
        throw new Error("Error");
      }),
    };
    try {
      await addItem(ctx);
    } catch (e) {}

    expect(ctx.throw).toBeCalledWith(400, "Please check the item format");
  });
});

describe("GetItem function", () => {
  test("GetItem Test", async () => {
    const item = { title: "Test title", content: "Hello world!" };
    const addResponse = await addItem({
      request: {
        body: item,
      },
    });
    expect(addResponse).toBe("Success");

    const ctx = {
      request: {
        query: {
          id: "0",
        },
      },
    };
    const response = JSON.parse(await getItem(ctx));

    expect(response.title).toBe(item.title);
    expect(response.content).toBe(item.content);
  });

  test("GetItem with missing id", async () => {
    const ctx = {
      throw: jest.fn(() => {
        throw new Error("Error");
      }),
    };

    try {
      await getItem(ctx);
    } catch (e) {}

    expect(ctx.throw).toBeCalledWith(400, "Please specify id");
  });

  test("GetItem with unknown id", async () => {
    const ctx = {
      request: {
        query: {
          id: "unknown",
        },
      },
      throw: jest.fn(() => {
        throw new Error("Error");
      }),
    };

    try {
      await getItem(ctx);
    } catch (e) {}

    expect(ctx.throw).toBeCalledWith(400, "Item cannot be found");
  });
});
