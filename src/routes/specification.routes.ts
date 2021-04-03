import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const specificationsService = new CreateSpecificationService(
    specificationsRepository
  );

  specificationsService.execute({ name, description });

  return res.status(201).json();
});

export { specificationsRoutes };
