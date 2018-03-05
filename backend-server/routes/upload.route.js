var express = require('express');
var fileUpload = require('express-fileupload');

//middleware 
var md_auth = require('../middlewares/autenticacion');
//ruta archivo 
//var md_upload = multipart({ uploadDir: './uploads/users' });
//controlador 
var UploadController = require('../controllers/upload.controller');

var api = express.Router();
// default options
api.use(fileUpload({
    //limits: { fileSize: 50 * 1024 * 1024 },
}));

api.post('/upload/:tipo/:id', [md_auth.ensureAuth], UploadController.uploadFiles);


module.exports = api;