var express = require('express');
var fileUpload = require('express-fileupload');

//middleware 
var md_auth = require('../middlewares/autenticacion');

//controlador 
var ImagenesController = require('../controllers/imagenes.controller');

var api = express.Router();

api.get('/imagen/:tipo/:img', ImagenesController.showImages);
//api.get('/imagen/:tipo/:img', md_auth.ensureAuth, ImagenesController.showImages);


module.exports = api;