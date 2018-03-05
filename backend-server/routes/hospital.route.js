var express = require('express');
//controlador 
var HospitalController = require('../controllers/hospital.controller');
//middleware
var md_auth = require('../middlewares/autenticacion');

var api = express.Router();

api.get('/hospitales', HospitalController.getHospitales);
api.post('/addhospital', md_auth.ensureAuth, HospitalController.crearHospital);
api.put('/updatehospital/:id', md_auth.ensureAuth, HospitalController.actualizaHospital);
api.delete('/deletehospital/:id', md_auth.ensureAuth, HospitalController.eliminaHospital);

module.exports = api;