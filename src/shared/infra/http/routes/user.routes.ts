import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/account/UseCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/account/UseCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticate";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

userRoutes.post("/", createUserController.handle);

userRoutes.patch(
  "/avatar",
  ensureAuthenticate,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { userRoutes };
