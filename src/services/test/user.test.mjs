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
})