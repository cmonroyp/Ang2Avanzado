var express = require('express');

//Controlador 
var UsuarioController = require('../controllers/usuario.controller');

var api = express.Router();


api.get('/getUsuarios', UsuarioController.getUsuarios);

module.exports = api;