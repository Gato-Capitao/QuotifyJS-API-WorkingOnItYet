import { Router } from "express"
import { createUser, getUser, updateUsername, updateUsersPassword, deleteUser } from "../controllers/User.controller.js"
import { IsBodyValid } from "../middleware/userValidation.js"

const routerUser = Router()

routerUser.post("/register-user", IsBodyValid, async (req, res) =>{
    return await createUser(req, res)
})

routerUser.post("/user/get", async (req, res) => {
    return await getUser(req, res)
})

routerUser.post("/user/update-username", async (req, res) => {
    return await updateUsername(req, res)
})

routerUser.post("/user/update-password", async (req, res) => {
    return await updateUsersPassword(req, res)
})

routerUser.post("/user/delete-account", async (req, res) => {
    return await deleteUser(req, res)
})

export {routerUser}