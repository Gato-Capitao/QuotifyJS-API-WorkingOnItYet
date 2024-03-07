import { TopicService } from "../services/Topic.service.js"

const instanceTopicService = new TopicService()

export async function createTopic(req, res){
    const {title, description, creatorId} = req.body
    const { statusValue, message} = await instanceTopicService.createTopic(title, description, creatorId)
    return res.status(statusValue).json({message: message})
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

export async function updateTitle(req, res){
    try{
        const { newTitle, topicId, userId, password } = req.body
        const response = await instanceTopicService.updateTitle(userId, topicId, password, newTitle)
        return res.status(response.statusValue).json({response})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}

export async function updateDescription(req, res){
    try{
        const { newDescription, topicId, userId, password } = req.body
        const response = await instanceTopicService.updateDescription(userId, topicId, password, newDescription)
        return res.status(response.statusValue).json({response})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}

export async function deleteTopic(req, res){
    try{
        const { userId, topicId, password} = req.body
        const response = await instanceTopicService.deleteTopic(userId, topicId, password)
        
        return res.status(response.statusValue).json({response})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}