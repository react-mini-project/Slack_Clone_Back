const MembersService = require("../service/members");

class MembersController {
  membersService = new MembersService();

  authCode = async (req, res, next) => {
    try {
      const { email } = req.body;
      const authCode = await this.membersService.authCode(email);
      res.status(200).json({ message: authCode });
    } catch (err) {
      res.status(400).json({ message: "인증 코드 발송에 실패했습니다" });
    }
  };

  createMembers = async (req, res, next) => {
    // try {
    const { email, SKEY } = req.body;

    const createMembers = await this.membersService.createMembers(email, SKEY);
    res.status(201).json({
      data: createMembers,
      message: "로그인에 성공했습니다",
    });
    // } catch (err) {
    res.status(400).json({ message: "로그인에 실패했습니다" });
    // }
  };
}

module.exports = MembersController;
