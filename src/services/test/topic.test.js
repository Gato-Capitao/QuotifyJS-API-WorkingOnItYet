import { TopicModel } from "../../models/Topic.model.js"
import { TopicService } from "../User.service.js"

const instanceTopicService = new TopicService()

test("Can create a topic", async ()=>{
    const response = await instanceTopicService.createTopic("Test", "Apenas um mero teste", "")

    expect(response.statusValue).toEqual(201)
})
