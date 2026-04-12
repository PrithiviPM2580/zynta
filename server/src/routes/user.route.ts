import { Router } from "express";
import { passportAuthenticateJwt } from "../config/passport.config";
import { getUsersController } from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.get("/all", passportAuthenticateJwt, getUsersController);

export default userRouter;
