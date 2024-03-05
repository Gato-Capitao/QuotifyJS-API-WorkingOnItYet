import { database } from "../database/connection.js"
import { TopicModel } from "../models/Topic.model.js"
import { SUCCESS } from "../shared/messages.js"

export async function createTopic(title, description, userId){
    try{
        await database.sync()
        await TopicModel.create(title, description, userId)
        return {
            statusValue:201,
            message: `Created ${SUCCESS.TOPIC}`
        }
    }catch{
        return{
            statusValue: 404,
            message: error.message
        }
    }
}