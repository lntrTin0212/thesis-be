import { Router } from "express";
import {
  trueFalseList,
  createNewTrueFalse,
} from "../app/controllers/gameController.js";

const router = Router();

router.route("/getTrueFalseList/:topicName").get(trueFalseList);
router.route("/createTrueFalse").post(createNewTrueFalse);

export default router;
