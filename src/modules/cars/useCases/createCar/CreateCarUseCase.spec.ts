import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name New Car",
      description: "Description Car",
      daily_rate: 200,
      brand: "Brand",
      fine_amount: 30,
      license_plate: "ABC-2020",
      category_id: "cat_id_test",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name New Car",
        description: "Description Car",
        daily_rate: 200,
        brand: "Brand",
        fine_amount: 30,
        license_plate: "ABC-2020",
        category_id: "cat_id_test",
      });

      await createCarUseCase.execute({
        name: "Name New Car2",
        description: "Description Car2",
        daily_rate: 200,
        brand: "Brand",
        fine_amount: 30,
        license_plate: "ABC-2020",
        category_id: "cat_id_test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name New Car",
      description: "Description Car",
      daily_rate: 200,
      brand: "Brand",
      fine_amount: 30,
      license_plate: "ABC-2020",
      category_id: "cat_id_test",
    });

    expect(car.available).toBe(true);
  });
});
