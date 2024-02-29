import { database } from "../database/connection.js"
import { UserModel } from "../models/User.model.js"
import { UserService } from "../services/User.service.js"

const instanceUsersService = new UserService()

export async function createUser(req, res){
    const { username, email, password } = req.body
    const {statusValue, message} = await instanceUsersService.createUser(username, email, password)
    return res.status(statusValue).json({message: message})
}

export async function getUser(req, res){
    const {id} = req.body
    const {statusValue, message, user} = await instanceUsersService.getUser(id)
    return res.status(statusValue).json({
        message: message,
        user: user
    })
    
}

export async function updateUsersPassword(req, res){
        const { id, password, newPassword} = req.body
        const {statusValue, message} = await instanceUsersService.updatePassword(id, password, newPassword)
        return res.status(statusValue).json({message: message})
}

export async function updateUsername(req, res){
    const { id, password, newUsername} = req.body
    const {statusValue, message} = await instanceUsersService.updateUsername(id, password, newUsername)
    return res.status(statusValue).json({message: message})
}

export async function deleteUser(req, res){
    const { id } = req.body
    const { statusValue, message} = await instanceUsersService.deleteUser(id)
    return res.status(statusValue).json({message: message})
}