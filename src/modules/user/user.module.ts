import Router from "koa-router";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthorizationMiddleware } from "../../middlewares/authorization";

const router = new Router();

const service = new UserService();
const controller = new UserController(service);
const authorizationMiddleware = new AuthorizationMiddleware()

router.post("/", async (ctx) => {
  await controller.registr(ctx);
});

router.post("/login", async (ctx) => {
  await controller.login(ctx)
})

router.get('/', authorizationMiddleware.checkToken, async (ctx) => {
  await controller.findAll(ctx)
})

router.get('/:id', async (ctx) => {
  await controller.findOne(ctx)
})

router.put('/:id', async (ctx) => {
  await controller.update(ctx)
})

router.delete("/:id", async (ctx) => {
  await controller.remove(ctx)
})

export { router };
