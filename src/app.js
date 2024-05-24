require('dotenv').config()

const BodyParser = require('body-parser')
const express = require('express')
const App = express()

App.use(BodyParser.urlencoded({extended: false}))
App.use(BodyParser.json())
App.set('views engine','ejs')
//definindo a rota /static como public
App.use('/static',express.static(__dirname+'/views/public'))
console.log(__dirname)
module.exports = {BodyParser,express,App}