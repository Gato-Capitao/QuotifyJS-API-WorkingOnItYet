import { database } from "../database/connection.js"
import { UserModel } from "../models/User.model.js"

export async function createUser(req, res){
    try{
        const {username} = req.body
        await database.sync()
        await UserModel.create({username})
        return res.status(201).json({message:"Created user sucessfully!"})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}

