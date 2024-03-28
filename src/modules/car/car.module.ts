import Router from "koa-router";

import { CarService } from "./car.service"
import { UserService } from "../user/user.service"
import { CarController } from "./car.controller"

const router = new Router()
const carService = new CarService()
const userService = new UserService()
const carController = new CarController(carService, userService)


router.post("/", async (ctx) => {
    await carController.create(ctx)
})

router.get('/', async (ctx) => {
    await carController.findAll(ctx)
})

router.get("/:id", async (ctx) => {
    await carController.findById(ctx)
})

router.put("/:id", async (ctx) => {
    await carController.update(ctx)
})

router.del("/:id", async (ctx) => {
    await carController.remove(ctx)
})

export { router }