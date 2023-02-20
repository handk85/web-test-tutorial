var items = [];

export { listItems, addItem, getItem, flushItems };

async function flushItems(ctx) {
  items = [];
}

async function listItems(ctx) {
  if (items.length < 1) {
    ctx.throw(400, "No items found");
  }
  return JSON.stringify(items);
}

async function addItem(ctx) {
  const item = ctx.request.body;
  item.id = `${items.length}`;
  if (!("title" in item) || !("content" in item)) {
    ctx.throw(400, "Please check the item format");
  }
  items.push(item);
  return "Success";
}

async function getItem(ctx) {
  const item_id = ctx.request?.query?.id;
  if (!item_id) {
    ctx.throw(400, "Please specify id");
  }

  const item = items.filter((a) => a.id === item_id);
  if (!item || item.length < 1) {
    ctx.throw(400, "Item cannot be found");
  }

  return JSON.stringify(item[0]);
}
