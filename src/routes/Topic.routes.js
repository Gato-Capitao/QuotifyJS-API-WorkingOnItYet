import { Router } from "express"
import { createTopic, getTopic, updateTitle, updateDescription, deleteTopic } from "../controllers/Topic.controller.js" 
import { TopicValidator } from "../middleware/Topic.validator.js"

const routerTopic = Router()

const instanceTopicValidator = new TopicValidator()

routerTopic.post("/create-topic", instanceTopicValidator.createTopicValidation(), async (req, res) =>{
    return await createTopic(req, res)
})

routerTopic.get("/topics/get", instanceTopicValidator.getTopicValidation(), async (req, res) =>{
    return await getTopic(req, res)
})

routerTopic.patch("/topics/update-title", instanceTopicValidator.updateTitleValidation(), async (req, res)=>{
    return await updateTitle(req, res)
})

routerTopic.patch("/topics/update-description", instanceTopicValidator.updateDescriptionValidation(), async (req, res)=>{
    return await updateDescription(req, res)
})

routerTopic.delete("/topic/delete-topic", instanceTopicValidator.deleteTopicValidation(), async (req, res)=>{
    return await deleteTopic(req, res)
})

export {routerTopic}