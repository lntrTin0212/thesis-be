import { Router } from "express";
import {
  getTopicList,
  getTopicDetail,
  getSubClass,
  getTopics,
  createNew,
  getVocabsAndMeaning,
  deleteVocab,
} from "../app/controllers/topicController.js";

const router = Router();

router.route("/getTopics").get(getTopics);
router.route("/getTopicList/:topic").get(getTopicList);
router.route("/getSubClass/:topic").get(getSubClass);
router.route("/vocabs").get(getVocabsAndMeaning);
router.route("/deleteVocab/:vocab").delete(deleteVocab);
router.route("/getTopicDetail/:name/:vocab").get(getTopicDetail);
router.route("/new").post(createNew);

export default router;
