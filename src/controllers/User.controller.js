import { database } from "../database/connection.js"
import { UserModel } from "../models/User.model.js"

export const createUser = async (username) => {
    await database.sync()
    await UserModel.create({username})
    return UserModel.findAll()
}