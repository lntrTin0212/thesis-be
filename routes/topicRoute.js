import { Router } from "express";
import {
  getTopicList,
  getTopicDetail,
  getSubClass,
  getTopics,
} from "../app/controllers/topicController.js";

const router = Router();

router.route("/getTopics").get(getTopics);
router.route("/getTopicList/:topic").get(getTopicList);
router.route("/getSubClass/:topic").get(getSubClass);
router.route("/getTopicDetail/:name/:vocab").get(getTopicDetail);

export default router;
