import { TopicService } from "../Topic.service.js"
import { QuoteService } from "../Quote.service.js"
import { UserService } from "../User.service.js"
import { QuoteModel } from "../../models/Quote.model.js"
import { TopicModel } from "../../models/Topic.model"
import { UserModel } from "../../models/User.model.js"

const instanceTopicService = new TopicService()
const instanceUserService = new UserService()
const instanceQuoteService = new QuoteService()

afterEach(async ()=>{
    await QuoteModel.destroy({where: {}})
    await TopicModel.destroy({where: {}})
    await UserModel.destroy({where: {}})
})

test("The usar can create a quote", async ()=>{
    const responseUser = await instanceUserService.createUser("username", "email@quote.test", "password")
    const responseTopic = await instanceTopicService.createTopic("A title", "A description", responseUser.userId)
    const responseQuote = await instanceQuoteService.createQuote("A quote", responseUser.userId, responseTopic.topicId)

    expect(responseQuote.statusValue).toEqual(201)
})