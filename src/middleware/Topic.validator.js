import { ERROS } from "../shared/messages";
export class TopicValidator{
    async createTopicValidator(){
        const { title, description, creatorId } = req.body || {}
        const fields = ["title", "description", "creatorId"]

        for (const field of fields) {
            if (!req.body[field]) {
                errors.push(`${ERROS.USER_NEEDS} a/an ${field}`);
            }
        }
        
        if (errors.length) {
            return res.status(404).json({ message: errors });
        }
        
        next()
    }

    async getTopicValidator(){
        const { id } = req.body || {}
        const fields = ["id"]
        const erros = []

        for(const field of fields){
            if(!req.body[field]){
                erros.push(`${ERROS.TOPIC_NEEDS} a/an ${field}`)
            }
        }

        if(erros.length){
            return res.status(404).json({message: erros})
        }

        next()
    }
}