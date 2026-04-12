import { Router } from "express";
import authRouter from "./auth.route";
import chatRouter from "./chat.route";
import userRouter from "./user.route";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/chat", chatRouter);

export default router;
