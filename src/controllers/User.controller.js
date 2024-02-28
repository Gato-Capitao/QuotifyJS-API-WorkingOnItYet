import { database } from "../database/connection.js"
import { UserModel } from "../models/User.model.js"

export async function createUser(req, res){
    try{
        const {username, email, password} = req.body
        await database.sync()
        await UserModel.create({username, email, password})
        return res.status(201).json({message:"Created user sucessfully!"})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}

export async function getUser(req, res){
    try{
        const { id } = req.body
        await database.sync()
        const user = await UserModel.findByPk(id)
        return res.status(200).json({user})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}

export async function updateUsersPassword(req, res){
    try{
        const { id, password, newPassword} = req.body
        await database.sync()
        const user = await UserModel.findByPk(id)
        if(user.password === password){
            user.update({password:newPassword})
            return res.status(200).json({message:"Password updated!"})
        }

        return res.json({error: "Wrong password!"})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}

export async function updateUsername(req, res){
    try{
        const { id, password, newUsername} = req.body
        await database.sync()
        const user = await UserModel.findByPk(id)
        if(user.password === password){
            user.update({username:newUsername})
            return res.status(200).json({message:"Username updated!"})
        }

        return res.json({error: "Wrong password!"})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}

export async function deleteUser(req, res){
    try{
        const { id } = req.body
        await database.sync()
        const user = await UserModel.findByPk(id)
        user.destroy()
        return res.status(200).json({message:"User destroyed sucessfully!"})
    }catch(error){
        return res.status(404).json({error: error.message})
    }
}