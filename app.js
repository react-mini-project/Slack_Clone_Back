const express = require("express");
const cors = require("cors");
const app = express();
const indexRouter = require("./routes/index");
const PORT = 3000;

app.use(cors());

app.use(express.json());
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`localhost:${PORT} is Running`);
});
