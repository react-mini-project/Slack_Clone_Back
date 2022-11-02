require("dotenv").config();
const Joi = require("joi");
const MembersRepository = require("../repository/member");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const random = randomstring.generate(6);
const schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

class MembersService {
  membersRepository = new MembersRepository();

  authCode = async (email) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "daum",
        host: "smtp.daum.net",
        port: 465,
        secure: true,
        auth: {
          user: process.env.DB_EMAIL,
          pass: process.env.DB_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"최강 1조 Team" <alstjq123579@daum.net>`,
        to: email,
        subject: "최강 1조 Auth Number",
        text: random,
      });
    } catch (err) {
      throw new Error();
    }
    return random;
  };

  findAllMembers = async () => {
    const findAllMembers = await this.membersRepository.findAllMembers();
    return findAllMembers;
  };
  createMembers = async (email, SKEY) => {
    try {
      schema.validate({ email });
      if (SKEY === process.env.SKEY) {
        const profileName = email.split("@")[0];
        const createMember = await this.membersRepository.createMembers(
          email,
          profileName
        );
        return {
          token: `Bearer ${jwt.sign({ email }, process.env.SECRETKEY)}`,
          createMember,
        };
      }
    } catch (err) {
      throw new Error();
    }
  };

  updateMember = async (email, profileName, nickname) => {
    try {
      const updateMember = await this.membersRepository.updateMember(
        email,
        profileName,
        nickname
      );
      return updateMember;
    } catch (err) {
      throw new Error();
    }
  };

  deleteMember = async (email) => {
    try {
      const deleteMember = await this.membersRepository.deleteMember(email);
      return deleteMember;
    } catch (err) {
      throw new Error();
    }
  };
}

module.exports = MembersService;
