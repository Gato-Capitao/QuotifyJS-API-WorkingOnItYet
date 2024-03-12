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
    const user1 = await instanceUserService.createUser("test", "user1@test.test", "test_test")
    const response = await instanceTopicService.createTopic("Resilience", "Quotes about resilience", user1.id)


    expect(response.statusValue).toEqual(201)
})

test("The user can't create more than one topic with a certain title", async ()=>{
    const user1 = await instanceUserService.createUser("test, user1@test.com", "test_test")
    await instanceTopicService.createTopic("A title", "a description", user1.id)
    const response2 = await instanceTopicService.createTopic("A title", "a description", user1.id)

    expect(response2.statusValue).toEqual(404)
})



