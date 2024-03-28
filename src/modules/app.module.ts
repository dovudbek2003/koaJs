import Router from "koa-router";
import { router as user } from "./user/user.module";
import { router as car } from "./car/car.module"

const router = new Router();

router.prefix("/api");

router.use("/user", user.routes());
router.use("/car", car.routes())

export { router };
