var express = require('express');

//Controlador 
var LoginController = require('../controllers/login.controller');

var api = express.Router();


api.post('/login', LoginController.loginUsuario);

module.exports = api;