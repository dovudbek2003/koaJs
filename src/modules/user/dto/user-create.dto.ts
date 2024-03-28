import Joi from "joi";
import { Role } from "../../../common/enums/role";

export type UserDto = {
  balance: number;
  role: Role;
  phoneNumber: string;
  password: string;
};

export interface ILoginDto {
  phoneNumber: string;
  password: string;
}

export const userSchema = Joi.object<UserDto, true>({
  phoneNumber: Joi.string().required(),
  balance: Joi.number().integer().min(0).required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

export const userLoginSchema = Joi.object<ILoginDto, true>({
  phoneNumber: Joi.string().required(),
  password: Joi.string().required(),
})
