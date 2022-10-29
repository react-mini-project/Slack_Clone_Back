const { Users } = require("../models");

class MembersRepository {
  createMembers = async (email, password) => {
    await Users.create(email, password);
    return;
  };
}

module.exports = MembersRepository;
