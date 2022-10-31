const express = require("express");
const cors = require("cors");
const app = express();
const indexRouter = require("./routes/index");

app.use(cors());

app.use(express.json());
app.use("/", indexRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/get_messages", (req, res) => {
  connection.query("SELECT * FROM messages", (error, messages) => {
    res.end(JSON.stringify(messages));
  });
});

const http = require("http").createServer(app);

const io = require("socket.io")(http);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "express-database.cdwl0uwak8rz.ap-northeast-2.rds.amazonaws.com",
  user: "root",
  password: "4321aaaa",
  database: "7weeks_socket",
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
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
