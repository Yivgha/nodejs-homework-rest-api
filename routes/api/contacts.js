const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

const { ctlrWrapper } = require("../../helpers");
const { validateBody, auth } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

router.get("/", auth, ctlrWrapper(ctrl.getListContacts));

router.get("/:id", auth, ctlrWrapper(ctrl.getById));

router.post("/", auth, validateBody(schemas.addSchema), ctlrWrapper(ctrl.addContact));

router.put("/:id", auth, validateBody(schemas.addSchema), ctlrWrapper(ctrl.updateContact));

router.patch("/:id/favorite", auth, validateBody(schemas.updateFavoriteSchema), ctlrWrapper(ctrl.updateStatusContact));

router.delete("/:id", auth, ctlrWrapper(ctrl.removeContact));

module.exports = router;