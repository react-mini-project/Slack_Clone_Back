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

  createMembers = async (email) => {
    schema.validate({ email });
    await this.membersRepository.createMembers(email);
    return {
      token: jwt.sign({ id, email }, process.env.SECRETKEY),
    };
  };
}

module.exports = MembersService;
