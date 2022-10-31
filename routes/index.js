const express = require("express");
const router = express.Router();
const membersRouter = require("../routes/members");
const chatRouter = require("./chat");
const authMiddleware = require("../middlewares/auth-middleware");

router.use("/members", membersRouter);
router.use("/chat", authMiddleware, chatRouter);

module.exports = router;
