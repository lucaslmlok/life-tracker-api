import { Router } from "express";
import { body } from "express-validator";

import * as authController from "../controllers/auth";
import User from "../models/User";
import { emailMsg } from "../util/messages";
import { PASSWORD_MIN_LENGTH } from "../util/form-config";
import { isAuth } from "../middleware/is-auth";

const router = Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage(emailMsg.invalid)
      .normalizeEmail()
      .custom(async (email) => {
        const user = await User.findOne({
          where: { email },
        });
        if (user) throw new Error(emailMsg.existed);
      }),
    body("password").trim().isLength({ min: PASSWORD_MIN_LENGTH }),
    body("name").trim(),
  ],
  authController.signup
);

router.post("/login", authController.login);

router.get("/check-token", isAuth, authController.checkToken);

export default router;
