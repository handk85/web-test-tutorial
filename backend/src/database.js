var items = [];

export { listItems, addItem, getItem };

async function listItems(ctx) {
  return JSON.stringify(items);
}

async function addItem(ctx) {
  const item = ctx.request.body;
  item.id = `${items.length}`;

  items.push(item);
}

async function getItem(ctx) {
  const item_id = ctx.request.query.id;
  const item = items.filter((a) => a.id === item_id);
  if (!item || item.length < 1) {
    ctx.throw(400, "Item cannot be found");
  }

  return JSON.stringify(item[0]);
}
