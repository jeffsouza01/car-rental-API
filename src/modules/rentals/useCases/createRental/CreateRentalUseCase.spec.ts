import { RentalRepositoryInMemory } from "@modules/rentals/repositories/RentalRepositoryInMemory";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalRepositoryInMemory: RentalRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "1290123",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
});
