import { database } from "../database/connection.js"
import { DataTypes, Sequelize } from "sequelize"
import { UserModel } from "./User.model.js"
import { TopicModel } from "./Topic.model.js"

const QuoteModel = database.define("tb_quotes", {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUID
    },

    quote:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    public:{
        type: DataTypes.BOOLEAN,
        defaultValue: Sequelize.BOOLEAN
    }
})

QuoteModel.belongsTo(UserModel, {
    foreignKey: "senderId",
    constraints: true
})

QuoteModel.belongsTo(TopicModel, {
    foreignKey: "topicId",
    constraints: true
})

export {QuoteModel}