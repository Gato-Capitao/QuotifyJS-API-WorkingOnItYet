import { Router } from "express"
import { createTopic } from "../controllers/Topic.controller.js"

const routerTopic = Router()

routerTopic.post("/create-topic", async (req, res) =>{
    return await createTopic(req, res)
})

export {routerTopic}