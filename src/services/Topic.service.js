import { database } from "../database/connection.js"
import { TopicModel } from "../models/Topic.model.js"
import { UserModel } from "../models/User.model.js"
import { SUCCESS, ERROS } from "../shared/messages.js"

export async function createTopic(title, description, userId){
    try{
        await database.sync()
        await TopicModel.create(title, description, userId)
        return {
            statusValue:201,
            message: `Created ${SUCCESS.TOPIC}`
        }
    }catch(error){
        return{
            statusValue: 404,
            message: error.message
        }
    }
}

export async function getTopic(id){
    try{
        await database.sync()
        const topic = await TopicModel.findByPk(id)
        return {
            statusValue: 200,
            topic: topic,
            message: `Returned ${SUCCESS.TOPIC}`
        }
    }catch(error){
        return {
            statusValue: 404,
            message: error.message
        }
    }
}


export async function updateTitle(userId, topicId,password, newTitle){
    try{
        const user = await UserModel.findByPk(userId)
        const topic = await TopicModel.findByPk(topicId)
        const errors = []

        if(!user){errors.push(`The user doesn't exist.`)}
        if(!topic){errors.push(`The topic doesn't exist.`)}
        if(user.password !== password){`${ERROS.WRONG_PASSWORD}`}

        if(errors.length){
            return {
                statusValue: 404,
                message: errors
            }
        }

        topic.update({title:newTitle})
        return {
            statusValue: 200,
            message: `Title ${SUCCESS.UPDATED}`
        }
    }catch(error){
        return {
            statusValue: 404,
            message: error.message
        }
    }
}

export async function updateDescription(userId, topicId, password, newDescription){
    try{
        const user = await UserModel.findByPk(userId)
        const topic = await TopicModel.findByPk(topicId)
        const errors = []

        if(!user){errors.push(`The user doesn't exist.`)}
        if(!topic){errors.push(`The topic doesn't exist.`)}
        if(user.password !== password){`${ERROS.WRONG_PASSWORD}`}

        if(errors.length){
            return {
                statusValue: 404,
                message: errors
            }
        }

        topic.update({description: newDescription})
        return {
            statusValue: 200,
            message: `Description ${SUCCESS.UPDATED}`
        }
    }catch(error){
        return {
            statusValue: 404,
            message: error.message
        }
    }
}

export async function deleteTopic(userId, topicId, password){
    try{
        const user = await UserModel.findByPk(userId)
        const topic = await TopicModel.findByPk(topicId)
        const errors = []

        if(!user){errors.push(`The user doesn't exist.`)}
        if(!topic){errors.push(`The topic doesn't exist.`)}
        if(user.password !== password){`${ERROS.WRONG_PASSWORD}`}

        if(errors.length){
            return {
                statusValue: 404,
                message: errors
            }
        }

        topic.destroy()
        return {
            statusValue: 200,
            message: `Topic ${SUCCESS.DELETED}`
        }
    }catch(error){
        return {
            statusValue: 404,
            message: error.message
        }
    }
}