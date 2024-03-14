import { QuoteService } from "../services/Quote.service.js"

const instanceQuoteService = new QuoteService()

export async function createQuote(req, res){
    try{
        const { quote, creatorId, topicId} = req.body
        const response = await instanceQuoteService.createQuote(quote, creatorId, topicId)

        return res.status(response.statusValue).json({
            message: response.message
        })
    }catch(error){
        return res.status(404).json({message:error.message})
    }
}

export async function deleteQuote(req, res){
    try{
        const { quoteId, userId, password } = req.body
        const response = await instanceQuoteService.deleteQuote(quoteId, userId, password)

        return res.status(response.statusValue).json({message: response.message})
    }catch(error){
        return res.status(404).json({message: error.message})
    }
}