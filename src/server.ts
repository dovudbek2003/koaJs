import Koa from "koa";
import Router from "koa-router";
import koaBodyParser from "koa-bodyparser";
import { config } from "./common/config";
import { router } from "./modules/app.module";
import { AuthorizationMiddleware } from "./middlewares/authorization"

const app = new Koa();

app.use(koaBodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.serverPort, () => {
  console.log(`http://localhost:${config.serverPort}`);
});
