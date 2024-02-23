import express from "express"
import { routerUser } from "./routes/User.routes"
import { tryToConnect } from "./database/connection"
const server = express()
const port = 8001

server.use(express.json())
server.use(routerUser)

server.listen(port, () => {
    tryToConnect()
    console.log("Running")
})
