const { Chat } = require("./models");
const jwt = require("jsonwebtoken");
const express = require("express");
const socketioJwt = require("socketio-jwt");
const cors = require("cors");
const app = express();
const indexRouter = require("./routes/index");

app.use(express.json());
app.use("/", indexRouter);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/get_messages", (req, res) => {
  connection.query("SELECT * FROM socket_test", (error, messages) => {
    res.end(JSON.stringify(messages));
  });
});

const http = require("http").createServer(app);

const io = require("socket.io")(http);
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PW,
  database: process.env.DB_DATABASE,
});

io.on("connection", (socket) => {
  socket.on("new_message", (data) => {
    console.log("Client says", data);
    io.emit("new_message", data);

    connection.query("INSERT INTO messages (message) VALUES ('" + data + "')");
  });
});
const port = 3000;

http.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
