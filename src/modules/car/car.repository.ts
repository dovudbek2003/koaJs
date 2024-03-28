import { PostgresDriver } from "../../lib/postgresDriver";
import { Car } from "./entity/car.entity";

export class CarRepository extends PostgresDriver {
    async insert(carEntity: Car): Promise<Car> {
        return await this.fetch(
            `insert into cars(index, model, user_id)
            values($1, $2, $3) returning *`,
            carEntity.index,
            carEntity.model,
            carEntity.user_id
        )
    }

    async findAll(): Promise<Car[]> {
        return await this.fetchAll(
            `select * from cars`
        )
    }

    async findById(id: number): Promise<Car> {
        return await this.fetch(
            `select * from cars where id = $1`, id
        )
    }

    async findByIndex(index: string): Promise<Car> {
        return await this.fetch(
            `select * from cars where index = $1`, index
        )
    }

    async update(id: number, carEntity: Car): Promise<Car> {
        return await this.fetch(
            `update cars
            set index = $2, model = $3, user_id = $4
            where id = $1 returning *`,
            id,
            carEntity.index,
            carEntity.model,
            carEntity.user_id
        )
    }

    async remove(id: number): Promise<Car> {
        return await this.fetch(
            `delete from cars
            where id = $1 returning *`,
            id
        )
    }
}