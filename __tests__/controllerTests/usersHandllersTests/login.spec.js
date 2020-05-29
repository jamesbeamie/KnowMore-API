const {
  userLogin,
} = require("../../../controllers/authController/loginHandler");
const { mockRequest, mockResponse } = require("../../testUtils/intercepter");

describe("Test login controller 'userLogin' ", () => {
  let req = mockRequest();
  const res = mockResponse();

  const userData = {
    username: "test",
    email: "test@email.com",
    password: "Testv@l1dpassword",
  };
  it("Returns status 200 and correct user data", async () => {
    await userLogin(req.body(userData));

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledTimes(1);
  });

  test("should 404 and return correct error message", async () => {
    await userLogin(req.body(userData));

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Login Failed" });
  });
});
