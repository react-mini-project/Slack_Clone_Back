require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { authType, authToken } = (authorization || "").split("");

  if (!authToken || authType !== "Bearer") {
    res.status(401).send({ errorMessage: "로그인 후 이용 가능한 기능입니다" });
    return;
  }

  try {
    const { id } = jwt.verify(authToken, process.env.SECRETKEY);

    Users.findByPk(id).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    res.status(401).send({ errorMessage: "로그인이 필요합니다" });
  }
};
