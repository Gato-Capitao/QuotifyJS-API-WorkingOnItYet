import { UserModel } from "../models/User.model.js"
import { database } from "../database/connection.js"

export class UserService{
    async createUser(username, email, password){
        try{
            await database.sync()
            await UserModel.create({username, email, password})
            return {
                statusValue: 201,
                message: "Created user sucessfully!"
            }
        }catch(error){
            return {
                statusValue: 404,
                message: error.message
            }
        }
    }

    async getUser(id){
        try{
            await database.sync()
            const user = await UserModel.findByPk(id)
            return {
                statusValue:200,
                message: "Returned user sucessfully!",
                user: user
            }
        }catch(error){
            return {
                statusValue:404,
                message: error.message
            }
        }
    }

    async updatePassword(id, password, newPassword){
        try{
            await database.sync()
            const user = await UserModel.findByPk(id)
            if(user.password === password){
                user.update({password:newPassword})
                return {
                    statusValue: 200,
                    message: "Password updated!"
                }
            }
    
            return {
                statusValue: 200,
                message: "Wrong password!"
            }
        }catch(error){
            return {
                statusValue: 404,
                message: error.message
            }
        }
    }

    async updateUsername(id, password, newUsername){
        try{
            await database.sync()
            const user = await UserModel.findByPk(id)
            if(user.password === password){
                user.update({username: newUsername})
                return {
                    statusValue: 200,
                    message: "Username updated!"
                }
            }
    
            return {
                statusValue: 200,
                message: "Wrong password!"
            }
        }catch(error){
            return {
                statusValue: 404,
                message: error.message
            }
        }
    }
}