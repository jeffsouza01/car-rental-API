import { Router } from "express";

import { CategoryRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoryRepository();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return res.status(404).json({ Error: "Category already Exists" });
  }

  categoriesRepository.create({ name, description });

  return res.status(201).json();
});

categoriesRoutes.get("/", (req, res) => {
  const list = categoriesRepository.list();

  return res.json(list);
});

export { categoriesRoutes };
