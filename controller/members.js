const MembersService = require("../service/members");

class MembersController {
  membersService = new MembersService();

  authCode = async (req, res, next) => {
    try {
      const { email } = req.body;
      const authCode = await this.membersService.authCode(email);
      res
        .status(200)
        .json({ data: authCode, message: "인증코드가 발송되었습니다" });
    } catch (err) {
      res.status(400).json({ message: "인증 코드 발송에 실패했습니다" });
    }
  };

  findAllMembers = async (req, res, next) => {
    const findAllMembers = await this.membersService.findAllMembers();
    res.status(200).send(findAllMembers);
  };
  createMembers = async (req, res, next) => {
    try {
      const { email, SKEY } = req.body;
      const createMembers = await this.membersService.createMembers(
        email,
        SKEY
      );
      res.status(201).json({
        data: createMembers,
        message: "로그인에 성공했습니다",
      });
    } catch (err) {
      res.status(400).json({ message: "로그인에 실패했습니다" });
    }
  };

  updateMember = async (req, res, next) => {
    try {
      const { email, profileName, nickname } = req.body;
      await this.membersService.updateMember(email, profileName, nickname);
      res.status(200).json({ message: "정상적으로 수정되었습니다." });
    } catch (err) {
      res.status(400).json({ message: "회원 정보가 일치하는지 확인해 주세요" });
    }
  };

  deleteMember = async (req, res, next) => {
    try {
      const { email } = req.body;
      await this.membersService.deleteMember(email);
      res.status(200).json({ message: "그 동안 감사했습니다" });
    } catch (err) {
      res.status(400).json({ message: "회원 정보가 일치하는지 확인해 주세요" });
    }
  };
}

module.exports = MembersController;
