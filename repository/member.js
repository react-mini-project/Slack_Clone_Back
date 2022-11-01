const { Users } = require("../models");

class MembersRepository {
  createMembers = async (email, profileName) => {
    const createMembers = await Users.create({
      email,
      profileName,
    });
    return createMembers;
  };

  updateMember = async (email, profileName, nickname) => {
    const updateMember = await Users.update({ nickname }, { where: { email } });
    return updateMember;
  };

  deleteMember = async () => {};
}

module.exports = MembersRepository;
