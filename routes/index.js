const express = require("express");
const router = express.Router();
const membersRouter = require("../routes/members");
const chatsRouter = require("./chats");
const roomRouter = require("./room");

router.use("/room", roomRouter);
router.use("/members", membersRouter);
router.use("/chats", chatsRouter);
module.exports = router;
