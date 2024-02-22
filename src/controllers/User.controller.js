import { database } from "../database/connection"
import { UserModel } from "../models/User.model"

export const createUser = async (username) => {
    await database.sync()
    await UserModel.create({username})
    return UserModel.findAll()
}