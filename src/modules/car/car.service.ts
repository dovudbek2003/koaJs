import { ResonseData } from "../../common/responseData"
import { CarRepository } from "./car.repository"
import { ICarDto } from "./dto/car.dto"
import { Car } from "./entity/car.entity"
import { CarAlreadyExist, CarNotFound } from "./exception/car.exception"

export class CarService {
    private readonly repository
    constructor() {
        this.repository = new CarRepository()
    }

    // CREATE
    async create(createCarDto: ICarDto) {
        console.log(createCarDto);

        const foundCar = await this.findByIndex(createCarDto.index)
        console.log('foundCar =>', foundCar);
        console.log(1);
        if (foundCar) {
            console.log(2);
            throw new CarAlreadyExist()
        }

        console.log(3);

        const newCar = Car.builder(createCarDto)
        console.log('newCar =>', newCar);

        const createdCar = await this.repository.insert(newCar)

        return new ResonseData<Car>('create', 201, createdCar)
    }

    // READ
    async findAll(): Promise<ResonseData<Car[]>> {
        const cars = await this.repository.findAll()
        return new ResonseData<Car[]>('get all', 200, cars)
    }

    async findById(id: number): Promise<ResonseData<Car>> {
        const foundCar = await this.repository.findById(id)
        if (!foundCar) {
            throw new CarNotFound()
        }

        return new ResonseData<Car>('get one', 200, foundCar)
    }

    async findByIndex(index: string): Promise<Car> {
        return await this.repository.findByIndex(index)
    }

    // UPDATE
    async update(id: number, updateCarDto: ICarDto): Promise<ResonseData<Car>> {
        const { data: foundCar } = await this.findById(id)
        if (!foundCar) throw new CarNotFound()
        const foundCarByIndex = await this.findByIndex(updateCarDto.index)
        if (foundCarByIndex.id !== id) throw new CarAlreadyExist()

        const newCar = Object.assign(foundCar, updateCarDto)
        if (updateCarDto.userId) {
            newCar.user_id = newCar.userId
        }

        const updatedCar = await this.repository.update(id, newCar)
        return new ResonseData<Car>('update', 200, updatedCar)
    }

    // DELETE
    async remove(id: number): Promise<ResonseData<Car>> {
        await this.findById(id)
        const deletedCar = await this.repository.remove(id)

        return new ResonseData<Car>('delete', 200, deletedCar)
    }
}