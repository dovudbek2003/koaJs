import { ICarDto } from "../dto/car.dto";

export class Car {
    id: number = 0;
    index: string;
    model: string;
    user_id: number;

    constructor(dto: ICarDto) {
        this.index = dto.index;
        this.model = dto.model;
        this.user_id = dto.userId;
    }

    static builder(dto: ICarDto) {
        return new Car(dto)
    }
}