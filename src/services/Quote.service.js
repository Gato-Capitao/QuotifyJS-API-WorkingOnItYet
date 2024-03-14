import { database } from "../database/connection.js"
import { QuoteModel } from "../models/Quote.model.js"
import { UserModel } from "../models/User.model.js"
import { TopicModel } from "../models/Topic.model.js"
import { SUCCESS, ERROS } from "../shared/messages.js"

export class QuoteService{
    async createQuote(quote, creatorId, topicId){
        try{
            await database.sync()
            const newQuote = await QuoteModel.create({quote, topicId, creatorId})
            return {
                statusValue: 201,
                quoteId: newQuote.id,
                message: `Created ${SUCCESS.QUOTE}`
            }
        }catch(error){
            return {
                message: error.message,
                statusValue: 404
            }
        }
    }

    async deleteQuote(quoteId, userId, password){
        try{
            await database.sync()
            const quote = await QuoteModel.findByPk(quoteId)
            const topic = await TopicModel.findByPk(quote.topicId)
            const user = await UserModel.findByPk(userId)

            if(quote.creatorId!==user.id || topic.creatorId !== user.id){return {statusValue: 404, message: "Only the creator of the quote or topic can delete it!"}}
            else if(user.password !== password){return {statusValue: 404, message: ERROS.WRONG_PASSWORD}}

            await quote.destroy()

            return {
                statusValue: 200,
                message: `Deleted ${SUCCESS.QUOTE}`
            }
        }catch(error){
            return {
                statusValue: 404,
                message: error.message
            }
        }
    }
}