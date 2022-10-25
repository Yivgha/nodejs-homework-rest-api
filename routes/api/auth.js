const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, auth, upload} = require("../../middlewares");

const { ctlrWrapper } = require("../../helpers");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctlrWrapper(ctrl.register));

router.post("/login", validateBody(schemas.loginSchema), ctlrWrapper(ctrl.login));

router.patch("/subscription", auth, validateBody(schemas.updSubscription), ctlrWrapper(ctrl.changeSubscription));

router.patch("/avatars", auth, upload.single("avatar"), ctlrWrapper(ctrl.updAvatar));

router.get("/current", auth, ctlrWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctlrWrapper(ctrl.logout));

module.exports = router;