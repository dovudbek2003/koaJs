import Joi from "joi";

export interface ICarDto {
    index: string;
    model: string;
    userId: number;
}

export const carSchema = Joi.object<ICarDto, true>({
    index: Joi.string().required(),
    model: Joi.string().required(),
    userId: Joi.number().integer().optional(),
});