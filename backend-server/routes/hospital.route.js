var express = require('express');
//controlador 
var HospitalController = require('../controllers/hospital.controller');
//middleware
var md_auth = require('../middlewares/autenticacion');

var api = express.Router();

api.get('/getHospitales/:desde?', md_auth.ensureAuth, HospitalController.getHospitales);
api.post('/crear-hospital', md_auth.ensureAuth, HospitalController.crearHospital);
api.put('/update-hospital/:id', md_auth.ensureAuth, HospitalController.actualizaHospital);
api.delete('/deleteHospital/:id', md_auth.ensureAuth, HospitalController.eliminaHospital);

module.exports = api;