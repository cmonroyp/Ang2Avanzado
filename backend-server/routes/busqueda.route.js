var express = require('express');

var api = express.Router();

//controlador 
var BusquedaController = require('../controllers/busqueda.controller');

api.get('/todo/:busqueda', BusquedaController.busquedaInformacion);
api.get('/coleccion/:tabla/:busqueda', BusquedaController.busquedaColeccion);


module.exports = api;