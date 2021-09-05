import { Router } from "express";

import { SendMailForgotPasswordController } from "@modules/account/UseCases/sendMailForgotPassword/SendMailForgotPasswordController";

const passwordRoutes = Router();

const sendMailForgotPasswordController = new SendMailForgotPasswordController();

passwordRoutes.post("/forgot", sendMailForgotPasswordController.handle);

export { passwordRoutes };
