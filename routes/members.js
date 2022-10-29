const { response } = require("express");
const express = require("express");
const router = express.Router();
const MembersController = require("../controller/members");
const membersController = new MembersController();

router.post("/signupAuth", membersController.authCode);
router.post("/signup", membersController.createMembers);

module.exports = router;

