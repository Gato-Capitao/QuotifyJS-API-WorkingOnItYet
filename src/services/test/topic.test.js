import { TopicModel } from "../../models/Topic.model.js"
import { TopicService } from "../Topic.service.js"
import { UserService } from "../User.service.js"
import { UserModel } from "../../models/User.model.js"

const instanceTopicService = new TopicService()
const instanceUserService = new UserService()

afterEach(async () => {
    await TopicModel.destroy({where: {}})
    await UserModel.destroy({where: {}})
});

test("The user can create a topic", async ()=>{
    const responseUser = await instanceUserService.createUser("test", "user@test.test", "test_test")
    const responseTopic = await instanceTopicService.createTopic("Resilience", "Quotes about resilience", responseUser.userId)

    expect(responseTopic.statusValue).toEqual(201)
})

test("The user can't create more than one topic with a certain title", async ()=>{
    const responseUser = await instanceUserService.createUser("test, user@test.com", "test_test")
    await instanceTopicService.createTopic("A title", "a description", responseUser.userId)
    const responseTopic = await instanceTopicService.createTopic("A title", "a description", responseUser.userId)

    expect(responseTopic.statusValue).toEqual(404)
})


