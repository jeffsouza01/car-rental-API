import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProviders/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalRepository: IRentalRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHourToRent = 24;
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is Unavailable");
    }

    const openRentalToUser = await this.rentalRepository.findOpenRentalByUser(
      user_id
    );

    if (openRentalToUser) {
      throw new AppError("There's a rental in progress for this user!");
    }

    const dateNow = this.dateProvider.dateNow();

    const compareDate = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compareDate < minimumHourToRent) {
      throw new AppError("Invalid Time");
    }

    const newRental = this.rentalRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return newRental;
  }
}

export { CreateRentalUseCase };
