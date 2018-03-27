var express = require('express');

//Controlador 
var UsuarioController = require('../controllers/usuario.controller');
//middleware
var md_auth = require('../middlewares/autenticacion');

var api = express.Router();


api.get('/getUsuarios/:desde?', md_auth.ensureAuth, UsuarioController.getUsuarios);
// api.post('/addUsuario', md_auth.ensureAuth, UsuarioController.crearUsuario);
api.post('/addUsuario', UsuarioController.crearUsuario);
api.put('/updateUsuario/:id', [md_auth.ensureAuth, md_auth.verificaADMIN_o_MismoUsuario], UsuarioController.actualizarUsuario);
api.delete('/deleteUsuario/:id', [md_auth.ensureAuth, md_auth.verificaADMIN_ROLE], UsuarioController.eliminarUsuario);

module.exports = api;