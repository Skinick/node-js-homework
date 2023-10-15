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

module.exports = router;