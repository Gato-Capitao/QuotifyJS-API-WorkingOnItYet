import { TopicModel } from "../models/Topic.model.js"
import { database } from "../database/connection.js"

const createTopic = async (title, description) => {
    await database.sync()
    await TopicModel.create({title, description})
    return TopicModel.findAll()
}

export {createTopic}