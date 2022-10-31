const MembersRepository = require("../../repository/member");
const MembersController = require("../../controller/members");
const MembersService = require("../../service/members");
const membersService = new MembersService();
const membersRepository = new MembersRepository();
const membersController = new MembersController();
const { Users } = require("../../models");
const httpMocks = require("node-mocks-http");

Users.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("create Members", () => {
  it("createMembers의 creat가 정상적으로 호출되는지 확인", async () => {
    await membersRepository.createMembers("alstjq1826@gmail.com");
    expect(Users.create).toBeCalledWith({ email: "alstjq1826@gmail.com" });
  });
});
