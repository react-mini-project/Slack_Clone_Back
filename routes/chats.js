const express = require("express");
const router = express.Router();
const { Chats } = require("../models");

router.get("/", async (req, res) => {
  const findAllChats = await Chats.findAll({});
  res.send(findAllChats);
});

module.exports = router;
