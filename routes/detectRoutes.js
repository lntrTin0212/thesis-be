import { Router } from "express";

import {
  get,
  getMobile,
  detectAnimal,
  getImg,
} from "../app/controllers/detectController.js";

const router = Router();
router.route("/get").get(get);
router.route("/mobileTesting").get(getMobile);
router.post(detectAnimal);
router.route("/getImg").get(getImg);

export default router;
