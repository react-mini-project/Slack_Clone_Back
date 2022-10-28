const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const PORT = 3000;

app.use(express.json());
app.use("/", indexRouter);
app.use((req, res, next) => {
  const error = new Error(`${(req, method)} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => {
  console.log(`localhost:${PORT} is Running`);
});
