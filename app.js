const { Chat } = require("./models");
const jwt = require("jsonwebtoken");
const express = require("express");
const socketioJwt = require("socketio-jwt");
const cors = require("cors");
const app = express();
const { Chats } = require("./models")
const indexRouter = require("./routes/index");

app.use(express.json());
app.use("/", indexRouter);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/get_messages', (req, res) => {
  connection.query('SELECT * FROM Chats', (error, message) => {
    res.end(JSON.stringify(message))
  })
})

const http = require('http').createServer(app)

const io = require('socket.io')(http)
const mysql = require('mysql');

const cookieParser = require("cookie-parser");
const connection = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USERNAME,
password: process.env.DB_PW,
database: process.env.DB_DATABASE,
})

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  socket.on("new_message", async (data) => {
    const {email, message, room} = data;
    const result = await Chats.create({
      email,
      room,
      message
    });
    // res.json({ result })
    
  io.emit('new_message', data, result)

  connection.query(
      "INSERT INTO Chats (message) VALUES ('" + data + "')",
    )
    })
  });
const port = 3000;

http.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
