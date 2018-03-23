var express = require('express');
//controlador 
var MedicoController = require('../controllers/medico.controllers');
//middleware
var md_auth = require('../middlewares/autenticacion');

var api = express.Router();

api.get('/getMedicos', md_auth.ensureAuth, MedicoController.getMedicos);
// api.get('/medicos/:id', md_auth.ensureAuth, MedicoController.getMedicos);
api.post('/addmedico', md_auth.ensureAuth, MedicoController.crearMedico);
api.put('/updatemedico/:id', md_auth.ensureAuth, MedicoController.actualizaMedico);
api.delete('/deletemedico/:id', md_auth.ensureAuth, MedicoController.eliminaMedico);

module.exports = api;