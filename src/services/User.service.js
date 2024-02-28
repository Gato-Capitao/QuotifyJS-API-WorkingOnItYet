import { UserModel } from "../models/User.model"

export class UserService{
    async createUser(username, email, password){
        try{
            await database.sync()
            await UserModel.create({username, email, password})
            return res.status(201).json({message:"Created user sucessfully!"})
        }catch(error){
            return res.status(404).json({error: error.message})
        }
    }

    async getUser(id){
        try{
            await database.sync()
            const user = await UserModel.findByPk(id)
            return res.status(200).json({user})
        }catch(error){
            return res.status(404).json({error: error.message})
        }
    }
}