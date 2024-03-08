import { ERROS } from "../shared/messages";
export class TopicValidator{
    async createTopicValidation(req, res, next){
        const { title, description, creatorId } = req.body || {}
        const fields = ["title", "description", "creatorId"]
        const errors = []

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

    async getTopicValidation(req, res, next){
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

    async updateTitleValidation(req, res, next){
        const { newTitle, topicId, userId, password } = req.body || {}
        const fields = ["newTitle", "topicId", "userId", "password"]
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

    async updateDescriptionValidation(req, res, next){
        const { newDescription, topicId, userId, password } = req.body || {}
        const fields = ["newDescription", "topicId", "userId", "password"]
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

    async deleteTopicValidation(req, res, next){
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