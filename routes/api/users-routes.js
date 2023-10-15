const express = require("express");
const { validateBody, ctrlWrapper } = require("../../utils");
const { authenticate } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { schemas } = require("../../models/user");
const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubSchema),
  ctrlWrapper(ctrl.updateSubUser)
);

module.exports = router;