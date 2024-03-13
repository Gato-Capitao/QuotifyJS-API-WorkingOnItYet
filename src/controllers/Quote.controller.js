import { QuoteService } from "../services/Quote.service.js"

const instanceQuoteService = new QuoteService()

export async function createQuote(req, res){
    try{
        const { quote, creatorId, topicId} = req.body
        const response = await instanceQuoteService.createQuote(quote, creatorId, topicId)

        return res.statusValue(response.statusValue).json({
            message: response.message
        })
    }catch(error){
        return res.statusValue(error.statusValue).json({message:error.message})
    }
}

export async function deleteQuote(req, res){
    try{

    }catch(error){
        return res.statusValue(error.statusValue).json({message: error.message})
    }
}