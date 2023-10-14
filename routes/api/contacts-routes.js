const express = require("express");

const { validateBody, ctrlWrapper } = require("../../utils");
const { isValidId } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getListContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactId));
router.post(
  "/",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.addNewContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateStatusSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContactById));

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContactById)
);

module.exports = router;