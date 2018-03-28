var express = require('express');

//Controlador 
var LoginController = require('../controllers/login.controller');
//middleware
var md_auth = require('../middlewares/autenticacion');

var api = express.Router();


api.post('/login', LoginController.loginUsuario);
api.get('/renueva-token', md_auth.ensureAuth, LoginController.renuvaToken);
api.post('/google', LoginController.autenticacionGoogle);

module.exports = api;