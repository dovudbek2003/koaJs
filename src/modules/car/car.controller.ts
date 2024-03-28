import { Context } from "koa";
import { CarService } from "./car.service";
import { checkDto } from "../../lib/cheackDto";
import { ICarDto, carSchema } from "./dto/car.dto";
import { ResonseData } from "../../common/responseData";
import { UserService } from "../user/user.service";

export class CarController {
    constructor(
        private readonly service: CarService,
        private readonly userService: UserService
    ) { }

    // CREATE
    async create(ctx: Context) {
        try {
            const dto = ctx.request.body as ICarDto;

            checkDto(carSchema, dto);

            if (dto.userId) {
                await this.userService.findOne(dto.userId)
            }

            const resData = await this.service.create(dto);

            ctx.message = resData.message;
            ctx.body = resData;
            ctx.status = resData.statusCode;
        } catch (error: any) {
            console.log(error);

            const resData = new ResonseData(error.message, error.statusCode || 500, null, error);
            console.log("resData => ", resData);

            ctx.body = resData;
            ctx.status = resData.statusCode;
        }
    }

    // READ
    async findAll(ctx: Context) {
        try {
            const resData = await this.service.findAll()
            ctx.message = resData.message
            ctx.body = resData
            ctx.status = resData.statusCode
        } catch (error: any) {
            const resData = new ResonseData(error.message, error.statusCode || 500, null, error);
            ctx.body = resData;
            ctx.status = resData.statusCode;
        }
    }

    async findById(ctx: Context) {
        try {
            const { id } = ctx.params
            const resData = await this.service.findById(+id)
            ctx.message = resData.message
            ctx.body = resData
            ctx.status = resData.statusCode
            return
        } catch (error: any) {
            const resData = new ResonseData(error.message, error.statusCode || 500, null, error);
            ctx.body = resData;
            ctx.status = resData.statusCode;
        }
    }

    // UPDATE
    async update(ctx: Context) {
        try {
            const { id } = ctx.params
            const dto = ctx.request.body as ICarDto;
            checkDto(carSchema, dto);

            const resData = await this.service.update(+id, dto)
            ctx.message = resData.message
            ctx.body = resData
            ctx.status = resData.statusCode
        } catch (error: any) {
            const resData = new ResonseData(error.message, error.statusCode || 500, null, error);
            ctx.body = resData;
            ctx.status = resData.statusCode;
        }
    }

    // DELETE
    async remove(ctx: Context) {
        try {
            const { id } = ctx.params
            const resData = await this.service.remove(+id)
            ctx.message = resData.message
            ctx.body = resData
            ctx.status = resData.statusCode
        } catch (error: any) {
            const resData = new ResonseData(error.message, error.statusCode || 500, null, error);
            ctx.body = resData;
            ctx.status = resData.statusCode;
        }
    }
}