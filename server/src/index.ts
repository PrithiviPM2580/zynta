import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import { Env } from "./config/env.config";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/async-handler.middleware";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { connectDatabase } from "./config/database.config";
import { initilizeSocket } from "./lib/socket.lib";
import http, { type Server } from "node:http";
import router from "./routes/index.route";
import "./config/passport.config";

const app: Express = express();
const server: Server = http.createServer(app);

initilizeSocket(server);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: Env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(passport.initialize());

app.get(
  "/health",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK).json({
      message: "Server is healthy",
      status: "OK",
    });
  }),
);
app.use("/api", router);
app.all("/{*splat}", (req: Request, res: Response) => {
  res.status(HTTPSTATUS.NOT_FOUND).json({
    message: "Route not found",
    status: "NOT_FOUND",
  });
});

app.use(errorHandler);

server.listen(Env.PORT, async () => {
  await connectDatabase();
  console.log(`Server is running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
});
