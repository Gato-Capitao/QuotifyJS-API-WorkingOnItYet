import { UserService } from "../User.service.js";
import { UserModel } from "../../models/User.model.js";

afterEach(async () => {
  await UserModel.destroy({ where: {} });
});

const userService = new UserService();

test("Can create a new user", async () => {
  const response = await userService.createUser("test", "reidafilosofia@classica.com", "OSabiaNuncaDizTudoQUePensa");
  expect(response.statusValue).toBe(201);
});

test("Can't create a user using a registered email", async () => {
  const registeredEmail = "reidafilosofia@classica.com";
  const uniqueUsername = "test" + Math.random().toString(36).substring(2);

  await userService.createUser(uniqueUsername, registeredEmail, "OSabiaNuncaDizTudoQUePensa");
  const response = await userService.createUser("another_test", registeredEmail, "SabiaQueOSabiaSabiaAssobiar");
  expect(response.statusValue).toBe(404);
});

test("Can't create a user using blank inputs", async () => {
  const response = await userService.createUser("", "", "");
  expect(response.statusValue).toBe(404);
});
