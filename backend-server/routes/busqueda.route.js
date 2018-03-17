var express = require('express');

var api = express.Router();

//middleware
var md_auth = require('../middlewares/autenticacion');

//controlador 
var BusquedaController = require('../controllers/busqueda.controller');

api.get('/todo/:busqueda?', md_auth.ensureAuth, BusquedaController.busquedaInformacion);
api.get('/coleccion/:tabla/:busqueda?', BusquedaController.busquedaColeccion);


module.exports = api;