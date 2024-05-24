//configurações iniciais
const FileApp = require('./app')

require('../Routes/routes')
require('../models/ConectionDB')
require('../models/setTable')

FileApp.App.listen(process.env.PORT,()=>{
    console.log('rodando na porta '+`${process.env.PORT}`)
})
 
                                