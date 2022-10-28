const MembersRepository = require("../../repository/member");
const { Users } = require("../../models");
const httpMocks = require("node-mocks-http");
const membersRepository = new MembersRepository();

const newUsers = require("../data/newUsers");

Users.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("create Members", () => {
  beforeEach(() => {
    req.body = newUsers;
  });

  it("createMembers가 함수인지 확인", () => {
    expect(typeof membersRepository.createMembers).toBe("function");
  });

  it("createMembers가 정상적으로 호출되는지 확인", async () => {
    await membersRepository.createMembers(req, res, next);
    expect(Users.create).toBeCalledWith(newUsers);
  });
});
