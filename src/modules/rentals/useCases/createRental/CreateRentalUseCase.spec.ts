import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProviders/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalRepositoryInMemory: RentalRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const addDate = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Test",
      category_id: "category_id",
      daily_rate: 150,
      description: "Car for a test",
      fine_amount: 40,
      brand: "Test",
      license_plate: "plate test",
    });
    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: car.id,
      expected_return_date: addDate,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a rental if there a exists rental for the same user", async () => {
    await rentalRepositoryInMemory.create({
      user_id: "user1",
      car_id: "car1",
      expected_return_date: addDate,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "user1",
        car_id: "car2",
        expected_return_date: addDate,
      })
    ).rejects.toEqual(
      new AppError("There's a rental in progress for this user!")
    );
  });

  it("should not be able to create a rental if there a exists rental for the same car", async () => {
    await rentalRepositoryInMemory.create({
      user_id: "user1",
      car_id: "car1",
      expected_return_date: addDate,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "1234556",
        car_id: "car1",
        expected_return_date: addDate,
      })
    ).rejects.toEqual(new AppError("Car is Unavailable"));
  });

  it("should not be able to create a rental with invalid time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1290123",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid Time"));
  });
});
