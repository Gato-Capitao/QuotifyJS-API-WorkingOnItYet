import { Router } from "express"
import { createUser } from "../controllers/User.controller"

export const routerUser = Router()

routerUser.post("/register-user/:username", async (req, res) =>{
    const { username } = req.params
    const result = await createUser(username)
    return res.json(result)
})