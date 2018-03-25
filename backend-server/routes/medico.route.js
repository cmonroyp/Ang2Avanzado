var express = require('express');
//controlador 
var MedicoController = require('../controllers/medico.controllers');
//middleware
var md_auth = require('../middlewares/autenticacion');

var api = express.Router();

api.get('/getMedicos', md_auth.ensureAuth, MedicoController.getMedicos);
api.get('/medico/:id', md_auth.ensureAuth, MedicoController.buscaMedicoId);
api.post('/crear-medico', md_auth.ensureAuth, MedicoController.crearMedico);
api.put('/update-medico/:id', md_auth.ensureAuth, MedicoController.actualizaMedico);
api.delete('/delete-medico/:id', md_auth.ensureAuth, MedicoController.eliminaMedico);

module.exports = api;