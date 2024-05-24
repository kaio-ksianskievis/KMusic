const FileApp = require('../src/app')
const {auth,token,authtoken} = require('../authentication/authentication')
const {enviaemail,AdicionaUsuario,VerificandoEmailExistente,pegaMusicas,pegaMusicasPeloNome}= require('../controllers/controllers')
//rotas
FileApp.App.get("/",(req,res)=>{
    res.render('login.ejs')
})
FileApp.App.post("/inicio",auth,(req,res)=>{
    res.render('inicio.ejs')
    const {email}= req.body 
    enviaemail(email)
})
FileApp.App.get("/criarconta",(req,res)=>{
    res.render('cria.ejs')
})
FileApp.App.post("/mensagem",VerificandoEmailExistente,(req,res)=>{
    AdicionaUsuario(req,res)
    res.render('mensagem.ejs')
})
//geração de token
FileApp.App.post("/auth",(req,res)=>{
    token(req,res)
})
//consumindo musicas
FileApp.App.get("/inicio/musicas",authtoken,(req,res)=>{
    pegaMusicas(req,res)
})
FileApp.App.get("/inicio/musicas/:nomeMusica",authtoken,(req,res)=>{
    const nome =  req.params.nomeMusica
    pegaMusicasPeloNome(req,res,nome)
})
//rota do player de musica
FileApp.App.get("/inicio/:nomeMusica",(req,res)=>{
    res.render('player.ejs')   
})