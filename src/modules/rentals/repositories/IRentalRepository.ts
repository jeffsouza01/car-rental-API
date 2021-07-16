import { ICreateRentalDTO } from "../infra/dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalRepository {
  findById(id: string): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findByUserId(user_id: string): Promise<Rental[]>;
  create(data: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalRepository };
