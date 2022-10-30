const { Users } = require("../models");

class MembersRepository {
  createMembers = async (email) => {
    await Users.create({ email });
    return;
  };
}

module.exports = MembersRepository;
