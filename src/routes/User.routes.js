import { Router } from "express"
import { createUser } from "../controllers/User.controller.js"
import { IsBodyValid } from "../middleware/userValidation.js"

export const routerUser = Router()

routerUser.post("/register-user", IsBodyValid, async (req, res) =>{
    const { username } = req.body
    const result = await createUser(username)
    return res.json(result)
})