import { database } from "../database/connection.js"
import { DataTypes, Sequelize } from "sequelize"

const TopicModel = database.define("tb_topics", {
    id:{
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUID
    },

    title:{
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },

    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },

    creatorId:{
        type: DataTypes.UUID,
        references:{
            model:"tb_users",
            key:"id"
        },
        allowNull: false
    }
})

export {TopicModel}