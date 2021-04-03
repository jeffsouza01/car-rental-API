import { SpecificationsRepository } from "../repositories/implementations/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}
class CreateSpecificationService {
  constructor(private specificationsRepository: SpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const SpecificationAlreadyExist = this.specificationsRepository.findByName(
      name
    );

    if (SpecificationAlreadyExist) {
      throw new Error("Specification already Exists");
    }

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationService };
