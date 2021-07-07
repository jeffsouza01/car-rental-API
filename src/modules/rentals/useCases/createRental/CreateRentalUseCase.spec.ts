import dayjs from "dayjs";

import { RentalRepositoryInMemory } from "@modules/rentals/repositories/RentalRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProviders/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalRepositoryInMemory: RentalRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const addDate = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: "10101212",
      expected_return_date: addDate,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a rental if there a exists rental for the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user1",
        car_id: "car1",
        expected_return_date: addDate,
      });

      await createRentalUseCase.execute({
        user_id: "user2",
        car_id: "car2",
        expected_return_date: addDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental if there a exists rental for the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1290123",
        expected_return_date: addDate,
      });

      await createRentalUseCase.execute({
        user_id: "1234556",
        car_id: "1290123",
        expected_return_date: addDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental with invalid time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1290123",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
