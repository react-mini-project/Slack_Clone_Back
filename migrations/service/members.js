require("dotenv").config();
const MembersRepository = require("../repository/member");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const random = randomstring.generate(6);
class MembersService {
  membersRepository = new MembersRepository();

  authCode = async (email) => {
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
    return random;
  };

  createMembers = async (email, password) => {
    await this.membersRepository.createMembers(email, password);
    return;
  };
}

module.exports = MembersService;
