import { Router } from "express"
import { createTopic, getTopic, updateTitle, updateDescription, deleteTopic } from "../controllers/Topic.controller.js"

const routerTopic = Router()

routerTopic.post("/create-topic", async (req, res) =>{
    return await createTopic(req, res)
})

routerTopic.get("/topics/get", async (req, res) =>{
    return await getTopic(req, res)
})

routerTopic.patch("/topics/update-title", async (req, res)=>{
    return await updateTitle(req, res)
})

routerTopic.patch("/topics/update-description", async (req, res)=>{
    return await updateDescription(req, res)
})

routerTopic.delete("/topic/delete-topic", async (req, res)=>{
    return await deleteTopic(req, res)
})

export {routerTopic}