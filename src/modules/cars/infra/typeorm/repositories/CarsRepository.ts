import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async findById(id: string): Promise<Car> {
    const carFound = await this.repository.findOne(id);

    return carFound;
  }

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const newCar = this.repository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      specifications,
      id,
    });

    await this.repository.save(newCar);

    return newCar;
  }

  async findAllAvailableCars(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const findCars = await this.repository
      .createQueryBuilder("car")
      .where("available = :available", { available: true });

    if (brand) {
      findCars.andWhere("brand = :brand", { brand });
    }

    if (name) {
      findCars.andWhere("name = :name", { name });
    }

    if (category_id) {
      findCars.andWhere("category_id = :category_id", { category_id });
    }

    const carsAvailable = await findCars.getMany();

    return carsAvailable;
  }

  async findByPlate(license_plate: string): Promise<Car> {
    const carFound = await this.repository.findOne({ license_plate });

    return carFound;
  }
}

export { CarsRepository };
