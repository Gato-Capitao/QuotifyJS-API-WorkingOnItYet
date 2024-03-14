import express from "express"
import { routerUser } from "./routes/User.routes.js"
import { routerTopic } from "./routes/Topic.routes.js"
import { routerQuote } from "./routes/Quote.routes.js"
import { tryToConnect } from "./database/connection.js"

const server = express()
const port = 8001

server.use(express.json())
server.use(routerUser)
server.use(routerTopic)
server.use()

server.listen(port, () => {
    tryToConnect()
    console.log("Running")
})

