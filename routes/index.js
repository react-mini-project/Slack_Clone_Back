const express = require("express");
const router = express.Router();
const membersRouter = require("../routes/members");
const chatRouter = require("./chat")

router.use("/members", membersRouter);
router.use("/chat", chatRouter);

module.exports = router;
