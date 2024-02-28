import { TopicModel } from "../models/Topic.model.js"
import { database } from "../database/connection.js"

export async function createTopic(req, res){
    try{
        const {title, description} = req.body
        await database.sync()
        await TopicModel.create({title, description})
        return res.status(201).json({message:"Created topic sucessfully!"})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}