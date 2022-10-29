const MembersService = require("../service/members");

class MembersController {
  membersService = new MembersService();

  authCode = async (req, res, next) => {
    const { email } = req.body;
    const authCode = await this.membersService.authCode(email);
    res.status(200).json({ message: authCode });
  };

  createMembers = async (req, res, next) => {
    const { email } = req.body;
    await this.membersService.createMembers(email);
    res.status(201).json({ message: "회원가입에 성공하였습니다" });
  };
}

module.exports = MembersController;
