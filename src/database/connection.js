import { Sequelize } from "sequelize"

const database = new Sequelize("db_quotify", "root", "",{
    host: "localhost",
    dialect: "mysql"
})

export async function tryToConnect(){
    try{
        database.sync({force: true})
        await database.authenticate()
        console.log("Connection Established")
    }catch (error){
        console.log("Error trying to establish connection")
    }
}

export {database}