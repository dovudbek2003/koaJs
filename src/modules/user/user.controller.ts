import { Context, DefaultContext } from "koa";
import { ResonseData } from "../../common/responseData";
import { ILoginDto, UserDto, userLoginSchema, userSchema } from "./dto/user-create.dto";
import { checkDto } from "../../lib/cheackDto";
import { UserService } from "./user.service";

export class UserController {
  constructor(private readonly service: UserService) { }

  async registr(ctx: Context) {
    try {
      const dto = ctx.request.body as UserDto;

      checkDto(userSchema, dto);

      const resData = await this.service.create(dto);

      ctx.message = resData.message;
      ctx.body = resData;
      ctx.status = resData.statusCode;
    } catch (error: any) {
      const resData = new ResonseData(error.message, error.statusCode || 500, null, error);
      ctx.body = resData;
      ctx.status = resData.statusCode;
    }
  }

  async login(ctx: Context) {
    try {
      const dto = ctx.request.body as ILoginDto

      checkDto(userLoginSchema, dto)

      const resData = await this.service.login(dto);

      ctx.message = resData.message;
      ctx.body = resData;
      ctx.status = resData.statusCode;
    } catch (error: any) {
      const resData = new ResonseData(error.message, error.statusCode || 500, null, error);
      ctx.body = resData;
      ctx.status = resData.statusCode;
    }
  }

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

  async findOne(ctx: Context) {
    try {
      const { id } = ctx.params
      const resData = await this.service.findOne(+id)
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


  async update(ctx: Context) {
    try {
      const { id } = ctx.params
      const dto = ctx.request.body as UserDto;
      checkDto(userSchema, dto);

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
