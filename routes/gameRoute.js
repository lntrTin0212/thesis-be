import { Router } from "express";
import {
  trueFalseList,
  createNewTrueFalse,
  dragAndDropList,
  createDragAndDrop,
} from "../app/controllers/gameController.js";

const router = Router();

router.route("/getTrueFalseList/:topicName").get(trueFalseList);
router.route("/createTrueFalse").post(createNewTrueFalse);

router.route("/get-drag-and-drop/:topicName").get(dragAndDropList);
router.route("/createDragAndDrop").post(createDragAndDrop);
export default router;
