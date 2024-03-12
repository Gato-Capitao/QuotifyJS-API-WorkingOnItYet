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
    const responseUser = await instanceUserService.createUser("test", "user@topic.test", "test_test")
    const responseTopic = await instanceTopicService.createTopic("Resilience", "Quotes about resilience", responseUser.userId)

    expect(responseUser.statusValue).toEqual(201)
    expect(responseTopic.statusValue).toEqual(201)
})

test("The user can't create more than one topic with a certain title", async ()=>{
    const responseUser = await instanceUserService.createUser("test", "user@topic.test", "test_test")
    const responseFirstTopic = await instanceTopicService.createTopic("A title", "a description", responseUser.userId)
    const responseSecondTopic = await instanceTopicService.createTopic("A title", "a description", responseUser.userId)

    expect(responseUser.statusValue).toEqual(201)
    expect(responseFirstTopic.statusValue).toEqual(201)
    expect(responseSecondTopic.statusValue).toEqual(404)
})

test("The creator can update the title", async ()=>{
    const responseUser = await instanceUserService.createUser("test", "test@topic.test", "test_test")
    const responseTopic = await instanceTopicService.createTopic("A title", "A description", responseUser.userId)

    const responseUpdateTopic = await instanceTopicService.updateTitle(responseUser.userId, responseTopic.topicId, "test_test", "A new title")

    expect(responseUser.statusValue).toEqual(201)
    expect(responseTopic.statusValue).toEqual(201)
    expect(responseUpdateTopic.statusValue).toEqual(200)
})