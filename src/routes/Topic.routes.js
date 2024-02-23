import { Router } from "express"
import { createTopic } from "../controllers/Topic.controller.js"

const routerTopic = Router()

routerTopic.post("/create-topic", async (req, res) =>{
    const {title, description} = req.body
    const result = await createTopic(title, description)
    return res.json(result)
})

export {routerTopic}