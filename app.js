const express = require("express");
const { Chats } = require("./models");
const indexRouter = require("./routes/index");
const app = express();
const port = 3000;

app.use("/", indexRouter);
app.get("/", (_, res) => {
  res.sendFile(__dirname + "/index.html");
});
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("소켓 서버 접속");
  socket.on("new_message", async (data) => {
    console.log(data);
    await Chats.create({
      email: data.email,
      room: data.room,
      message: data.message,
    });
    io.emit("new_message", data);
  });
});

http.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
