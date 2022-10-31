require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log("test: ", authorization.split(" "));
  const [authType, authToken] = authorization.split(" ");
  console.log(authType, authToken);
  if (!authToken || authType !== "Bearer") {
    res.status(401).send({ errorMessage: "로그인 후 이용 가능한 기능입니다" });
    return;
  }

  // try {
  const { email } = jwt.verify(authToken, process.env.SECRETKEY);

  Users.findOne({ where: { email } }).then((user) => {
    res.locals.user = user;
    next();
  });
  // } catch (error) {
  //   res.status(401).send({ errorMessage: "로그인이 필요합니다" });
  // }
};
