const express = require("express");
const router = express.Router();
const { Rooms } = require("../models");
const { Chats } = require("../models");

router.post("/", async (req, res) => {
  const { room } = req.body;
  await Rooms.create({ room });
  const findAllRoom = await Rooms.findAll({});
  res.status(201).json(findAllRoom);
});

router.get("/", async (req, res) => {
  const findAllRoom = await Rooms.findAll({});
  res.status(200).json(findAllRoom);
});
module.exports = router;
