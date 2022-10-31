const { Router } = require("express");
const express = require("express");
const router = express.Router();
const { Chat } = require("../models");

router.get("/:chatId", async (req, res, next) => {
  //채팅방 로그 돌려주는
  try {
    const { chatId } = req.params;
    const chatRoom = await Chat.findOne({ where: { chatId } });
    if (!chatRoom) {
      res.status(201).json({ message: "채팅기록이 없습니다." });
    } else {
      res.status(200).json({ chatRoom });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { email } = res.locals.user;
  const room = req.body;
  const message = req.body;
  const createdChat = await Chat.create({ email, room, message });
  res.status(201).json(createdChat);
});

module.exports = router;
