import { Router } from "express";

import {
  createMpesaStkPushController,
  mpesaCallbackController,
} from "../controllers/mpesa.controller.js";

const router = Router();

router.post("/mpesa/stk-push", createMpesaStkPushController);
router.post("/mpesa/callback", mpesaCallbackController);

export default router;
