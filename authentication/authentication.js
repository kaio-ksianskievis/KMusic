const {Usuarios} = require('../models/setTable')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const password = process.env.JWTPASS
//middlewares
async function auth(req,res ,next){
    const {email,senha} = req.body
    const result = await Usuarios.findOne({where:{email: email}})
    if(result != null && result != undefined){
        bcrypt.compare(senha,result.dataValues.senha,(err,data)=>{
            if(data){
                next()
            }else{
                res.stausCode = 400
                res.redirect("/")
            }
        })
    }else{
        res.stausCode = 400
        res.redirect("/")
    }
}
function authtoken(req,res,next){
    var token = req.headers.authorization
    if(token != undefined && token != null){
        const bearer = token.split(" ")
        token = bearer[1]
        jwt.verify(token,password,(err,data)=>{
            if(err){
                res.stausCode = 4000
                res.send("token invalido")
            }else{
                next()
            }
        })
    }else{
        res.stausCode = 4000
        res.send("token invalido")
    }
}
// gera token
function token(req,res){
    const {email,senha} = req.body
    Usuarios.findOne({where:{email: email}}).then((data)=>{
        if(data!= undefined && data!= null){
            bcrypt.compare(senha,data.dataValues.senha,(err,data)=>{
                if(data){
                    jwt.sign({email: email},password,{expiresIn: '5h'},(err,token)=>{
                        if(token){
                            res.stausCode = 200
                            res.json({token:token})
                        }else{
                            res.stausCode = 400
                            res.json({falha:'falha interna'})
                        }
                    })
                }else{
                    res.stausCode = 400
                    res.redirect("/")
                }
            })
        }else{
            res.stausCode = 400
            res.send('senha ou email incorretos')
        }
    })
}

module.exports = {auth,token,authtoken}