import { database } from "../database/connection.js"
import { TopicModel } from "../models/Topic.model.js"
import { UserModel } from "../models/User.model.js"
import { SUCCESS, ERROS } from "../shared/messages.js"

export class TopicService{
    async createTopic(title, description, creatorId){
        try{
            await database.sync()
            await TopicModel.create({title, description, creatorId})
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

    async getTopic(id){
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


    async updateTitle(userId, topicId,password, newTitle){
        try{
            const user = await UserModel.findByPk(userId)
            const topic = await TopicModel.findByPk(topicId)

            if(!user) return {statusValue: 404, message:`The user doesn't exist`}
            if(!topic) return {statusValue: 404, message:`The topic doesn't exist.`}
            if(user.id !== topic.creatorId) return {statusValue: 404, message:`Only the creator can change the title!`}
            if(user.password !== password) return {statusValue:404, message:`${ERROS.WRONG_PASSWORD}`}

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

    async updateDescription(userId, topicId, password, newDescription){
        try{
            const user = await UserModel.findByPk(userId)
            const topic = await TopicModel.findByPk(topicId)

            if(!user) return {statusValue: 404, message:`The user doesn't exist.`}
            if(!topic) return {statusValue: 404, message:`The topic doesn't exist.`}
            if(user.id !== topic.creatorId) return {statusValue: 404, message: "Only the creator can update the description."}
            if(user.password !== password) return {statusValue: 404, message:`${ERROS.WRONG_PASSWORD}`}

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

    async deleteTopic(userId, topicId, password){
        try{
            const user = await UserModel.findByPk(userId)
            const topic = await TopicModel.findByPk(topicId)

            if(!user) return {statusValue: 404, message:`The user doesn't exist.`}
            if(!topic) return {statusValue: 404, message:`The topic doesn't exist.`}
            if(user.id !== topic.creatorId) return {statusValue: 404, message: `Only the creator can delete the topic.`}
            if(user.password !== password) return {statusValue: 404, message:`${ERROS.WRONG_PASSWORD}`}

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
}