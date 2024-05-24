const { hash } = require('bcrypt')
const {Usuarios,Musicas} = require('../models/setTable')
const nodemailer = require('nodemailer')
//functions
function enviaemail(emailLogado){
    const transport = nodemailer.createTransport({
        host: process.env.HOST_EMAIL,
        port: process.env.PORT_EMAIL,
        secure:process.env.SECURE_EMAIL,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL
        }
    })
    transport.sendMail({
        from: 'KMUSIC',
        to: emailLogado,
        subject: 'teste',
        html:'<h1>olá</h1>'
    }).then(()=>{
        console.log('email enviado')
    }).catch(()=>{
        console.log('erro no email')
    })
}

async function AdicionaUsuario(req,res){
    const {email,senha} = req.body
    const senhacriptografada = await hash(senha,8)
    Usuarios.create({
        email: email,
        senha: senhacriptografada
       })
}

function pegaMusicas(req,res){
    Musicas.findAll({raw:true}).then((data)=>{
        res.json(data)
    })
}
function pegaMusicasPeloNome(req,res, nome){
    Musicas.findOne({where:{nome:nome}}).then((data)=>{
        res.json(data)
    })
}
//middleware
async function VerificandoEmailExistente(req,res,next){
    const {email,senha} = req.body
    if(email && senha){
        const busca = await Usuarios.findOne({where: {email: email}})
        if(busca == undefined || busca== null){
            next()
        }else{
            res.statusCode = 400
            res.redirect('/criarconta')
       }
    }else{
        res.statusCode = 400
        res.redirect('/criarconta')
   }
}

module.exports = {enviaemail,AdicionaUsuario,VerificandoEmailExistente,pegaMusicas,pegaMusicasPeloNome}