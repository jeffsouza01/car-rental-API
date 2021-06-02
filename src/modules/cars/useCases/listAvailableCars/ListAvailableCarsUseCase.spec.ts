import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("should be able list all cars", async () => {
    const car = await carsRepository.create({
      name: "New Car",
      description: "Description Car",
      daily_rate: 200,
      brand: "brand_new",
      fine_amount: 30,
      license_plate: "ABC-2020",
      category_id: "cat_id_test",
    });

    const carsAvailable = await listAvailableCarsUseCase.execute({});

    expect(carsAvailable).toEqual([car]);
  });

  it("should to able to list all available cars by name", async () => {
    const car = await carsRepository.create({
      name: "New Car",
      description: "Description Car",
      daily_rate: 200,
      brand: "brand_car",
      fine_amount: 30,
      license_plate: "ABC-2020",
      category_id: "cat_id_test",
    });

    const carsAvailable = await listAvailableCarsUseCase.execute({
      name: "New Car",
    });

    expect(carsAvailable).toEqual([car]);
  });

  it("should to able to list all available cars by brand", async () => {
    const car = await carsRepository.create({
      name: "New Car",
      description: "Description Car",
      daily_rate: 200,
      brand: "brand_test",
      fine_amount: 30,
      license_plate: "ABC-2020",
      category_id: "cat_id_test",
    });

    const carsAvailable = await listAvailableCarsUseCase.execute({
      brand: "brand_test",
    });

    expect(carsAvailable).toEqual([car]);
  });

  it("should to able to list all available cars by category ID", async () => {
    const car = await carsRepository.create({
      name: "New Car",
      description: "Description Car",
      daily_rate: 200,
      brand: "brand_test",
      fine_amount: 30,
      license_plate: "ABC-2020",
      category_id: "123-456",
    });

    const carsAvailable = await listAvailableCarsUseCase.execute({});

    expect(carsAvailable).toEqual([car]);
  });
});
