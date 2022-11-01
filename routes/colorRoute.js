import * as express from "express";

import * as colors from "../app/controllers/colorController.js";
import { getTopicList } from "../app/controllers/topicController.js";

const colorRouter = express.Router();
colorRouter.route("/getAll").get(getTopicList);

export default colorRouter;
