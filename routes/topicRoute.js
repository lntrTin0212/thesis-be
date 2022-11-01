import { Router } from "express";
import {
  getAllTopic,
  getTopicList,
  getTopicDetail,
} from "../app/controllers/topicController.js";
const router = Router();
router.route("/getAll").get(getAllTopic);
router.route("/getTopicList/:name").get(getTopicList);
router.route("/getTopicDetail/:name/:vocab").get(getTopicDetail);
export default router;
