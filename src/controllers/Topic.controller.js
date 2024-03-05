import { TopicModel } from "../models/Topic.model.js"
import { TopicService } from "../services/Topic.service.js"

const instanceTopicService = new TopicService()

export async function createTopic(req, res){
    try{
        const {title, description, userId} = req.body
        const response = await instanceTopicService.createTopic(title, description, userId)
        return res.status(response.statusValue).json({message: response.message})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}

export async function getTopic(req, res){
    try{
        const {id} = req.body
        const response = await instanceTopicService.getTopic(id)
        return res.status(response.statusValue).json({response})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}

