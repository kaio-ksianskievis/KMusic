const DB = require('./ConectionDB')
//tables
const Musicas = DB.sequelize.define(process.env.TABLE_NAME,{
    nome: {type: DB.Sequelize.STRING},
    Foto: {type: DB.Sequelize.STRING},
    artista: {type: DB.Sequelize.STRING},
    src: {type: DB.Sequelize.STRING}
})

const Usuarios = DB.sequelize.define(process.env.TABLE_NAME2,{
    email: {type: DB.Sequelize.STRING},
    senha: {type: DB.Sequelize.STRING}
})
//create tables
Musicas.sync({force: false})
Usuarios.sync({force: false})

module.exports = {Musicas,Usuarios}
