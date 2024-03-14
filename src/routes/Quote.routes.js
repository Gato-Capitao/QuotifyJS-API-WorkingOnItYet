import { createQuote, deleteQuote } from "../controllers/Quote.controller.js"
import { Router } from "express"

const routerQuote = Router()

routerQuote.post("/create-quote", async (req, res)=>{
    return await createQuote(req, res)
})
routerQuote.delete("/quotes/delete", async (req, res)=>{
    return await deleteQuote(req, res)
})

export {routerQuote}