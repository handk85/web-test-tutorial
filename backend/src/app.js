import Koa from "koa";
import Router from "koa-router";
import json from "koa-json";
import logger from "koa-logger";
import cors from "@koa/cors";
import bodyParser from "koa-body";

import { listItems, getItem, addItem } from "./database";

const app = new Koa();
const router = new Router();

function addRoute(path, handler) {
  router.get(path, async (ctx, next) => {
    ctx.body = await handler(ctx);
    await next();
  });
}

addRoute("/list", listItems);
addRoute("/item", getItem);

router.post("/add", async (ctx, next) => {
  ctx.body = await addItem(ctx);
  await next();
});

app
  .use(json())
  .use(logger())
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
