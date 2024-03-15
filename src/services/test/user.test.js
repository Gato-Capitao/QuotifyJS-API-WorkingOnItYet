import { UserService } from "../User.service.js"
import { UserModel } from "../../models/User.model.js"

afterEach(async ()=>{
    await UserModel.destroy({where: {}})
})

const instanceUserService = new UserService()

test("Can create a user", async ()=>{
  const reponseUser = await instanceUserService.createUser("test", "test@user.test", "test_test")

  expect(reponseUser.statusValue).toEqual(201)
})

test("Can get user by id", async ()=> {
  const responseUser = await instanceUserService.createUser("test", "test@user.test", "test_test")

  const result = await instanceUserService.getUser(responseUser.userId)

  expect(result.statusValue).toEqual(200)
})

test("The user can update password and only using the right password", async ()=>{
  const responseUser = await instanceUserService.createUser("test", "test@user.test", "RIGHT_password")

  const resultWrongPassword = await instanceUserService.updatePassword(responseUser.userId, "WRONG_password", "UShouldntBeAbleToUpdateIt")

  const resultRightPassword = await instanceUserService.updatePassword(responseUser.userId, "RIGHT_password", "UMustBeAbleToUpdateIt")

  expect(resultWrongPassword.statusValue).toEqual(404)
  expect(resultRightPassword.statusValue).toEqual(200)
})

