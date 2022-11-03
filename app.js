const express = require("express");
const { Chats } = require("./models");
const { Rooms } = require("./models");
const cors = require("cors");
const indexRouter = require("./routes/index");
const app = express();
const port = 3000;
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/", indexRouter);
app.get("/", (_, res) => {
  res.sendFile(__dirname + "/index.html");
});
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("소켓 서버 접속");
  socket.on("new_room", function (msg) {
    console.log("log: ", msg);
    let rommName = msg;
    socket.join(rommName);
  });
  socket.on("new_message", async (msg) => {
    const findRoomChats = await Chats.findAll({ where: { room: msg.room } });
    console.log("room: ", msg);
    io.to(msg.room).emit("receive", findRoomChats);
  });
  // socket.on("new_message", async (data) => {
  //   console.log("data: ", data);
  //   await Chats.create({
  //     email: data.email,
  //     room: data.room,
  //     message: data.message,
  //   });
  //   io.emit("new_message", data);
  // });
});

http.listen(port, () => {
  console.log(`Listening to port ${port}`);
});