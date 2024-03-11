import { database } from "../database/connection.js"
import { DataTypes, Sequelize } from "sequelize"
import { UserModel } from "./User.model.js"
import { TopicModel } from "./Topic.model.js"

const QuoteModel = database.define("tb_quotes", {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },

    quote:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    topicId:{
        type: DataTypes.UUID,
        references:{
            model: TopicModel,
            key: TopicModel.id
        },
        allowNull: false
    },

    creatorId:{
        type: DataTypes.UUID,
        references:{
            model: UserModel,
            key: UserModel.id
        },
        allowNull: false
    }
})

export {QuoteModel}