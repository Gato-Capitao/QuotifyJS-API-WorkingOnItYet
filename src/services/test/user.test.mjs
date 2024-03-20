import { UserModel } from "../../models/User.model.js"
import { UserService } from "../User.service.js"

jest.mock("../../models/Topic.model.js")

describe("UserService", ()=>{
    afterEach(async ()=>{
        await UserModel.destroy.mockClear()
    })

    test("Can create a user", async ()=>{
        const service = new UserService()

        const response = await service.createUser("test", "test@user.test", "test_test")

        expect(response.statusValue).toEqual(201)
        expect(UserModel.create).toHaveBeCalledWith({
            username: "test",
            email: "test@user.test",
            password: "test_test"
        })
    })

    test("Can delete a user", async ()=>{
        const service = new UserService()

        const responseCreatUser = await service.createUser("test", "test@user.test", "test_test")

        expect(responseCreatUser.statusValue).toEqual(201)

        const responseDeleteUset = await service.deleteUser(responseCreatUser.userId)

        expect(responseCreatUser.statusValue).toEqual(200)
    })
})