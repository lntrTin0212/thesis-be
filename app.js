import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import helmet from "helmet";

import AppError from "./utils/appError.js";
import graphDBEndpoint from "./config/db/index.js";
import connectDB from "./config/db/mongoose.js";
import colorRouter from "./routes/colorRoute.js";
import topicRoute from "./routes/topicRoute.js";
import userRouter from "./routes/userRoutes.js";
import gameRouter from "./routes/gameRoute.js";

const app = express();
app.enable("trust proxy");

app.use(cors());
app.options("*", cors());
app.use(helmet());

app.use(express.json());
app.use(morgan("combined"));
app.use("/api/v1/color", colorRouter);
app.use("/api/v1/topic", topicRoute);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/game", gameRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

export default app;
