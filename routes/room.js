const express = require("express");
const router = express.Router();
const { Rooms } = require("../models");
const { Chats } = require("../models");

router.post("/", async (req, res) => {
  const { room } = req.body;
  await Rooms.create({ room });
  res.status(201).json({ message: "채널이 생성되었습니다" });
});

module.exports = router;
