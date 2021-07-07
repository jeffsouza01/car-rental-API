import { ICreateRentalDTO } from "../infra/dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";
import { IRentalRepository } from "./IRentalRepository";

class RentalRepositoryInMemory implements IRentalRepository {
  rentals: Rental[] = [];
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => car_id === rental.car_id && !rental.end_date
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => user_id === rental.user_id && !rental.end_date
    );
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }
}

export { RentalRepositoryInMemory };
