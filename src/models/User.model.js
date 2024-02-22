import { database } from "../database/connection.js"
import { DataType, DataTypes, Sequelize } from "sequelize"

export const UserModel = database.define("tb_users", {
    id:{
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    username:{
        type: DataTypes.STRING(20),
        allowNull: false,
    }
})