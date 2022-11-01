import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import helmet from "helmet";

import AppError from "./utils/appError.js";
import graphDBEndpoint from "./config/db/index.js";
import connectDB from "./config/db/mongoose.js";
import router from "./routes/detectRoutes.js";
import colorRouter from "./routes/colorRoute.js";
import topicRoute from "./routes/topicRoute.js";

const app = express();
app.enable("trust proxy");

app.use(cors());
app.options("*", cors());
app.use(helmet());
// connectDB();
// let color = "Blue";
// const queryColor = await graphDBEndpoint.query(
//   `
//     PREFIX : <http://www.semanticweb.org/admin/ontologies/2022/9/untitled-ontology-2>
//     PREFIX owl: <http://www.w3.org/2002/07/owl#>
//     PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
//     SELECT * where {  <http://www.semanticweb.org/admin/ontologies/2022/9/untitled-ontology-2#${color}> ?predicate ?object}
//     `
// );
// console.log(queryColor);
app.use(express.json());
app.use(morgan("combined"));
app.use("/api/v1/", router);
app.use("/api/v1/color", colorRouter);
app.use("/api/v1/topic", topicRoute);

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

export default app;
