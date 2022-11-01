const express = require("express");
const router = express.Router();
const MembersController = require("../controller/members");
const membersController = new MembersController();

router.post("/signupAuth", membersController.authCode);
router.post("/signup", membersController.createMembers);
router.put("/", membersController.updateMember);
router.delete("/", membersController.deleteMember);

module.exports = router;
