const Sequelize = require('sequelize')
//definido meu banco de dados
const sequelize = new Sequelize(process.env.DB_NAME,process.env.USER_DB,process.env.DB_PASSWORD,{
    host: process.env.HOST_DB,
    dialect: process.env.DIALECT
})
//autenticação do banco de dados
sequelize.authenticate().then(()=>{
    console.log('conectado ao banco de dados')
}).catch((err)=>{
    console.log('erro ao conectar ao banco de dados' + err)
})

module.exports = {Sequelize,sequelize}