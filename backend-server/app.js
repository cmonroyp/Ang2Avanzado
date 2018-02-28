//Requires 
var express = require('express');
var mongoose = require('mongoose');


//Inicializar variables 
var app = express();


//Conexion base de datos 
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) {
        console.log('Error en la Conexion  a la BD: ', err);
    } else {
        console.log('Base de datos : \x1b[32m%s\x1b[0m', 'online');
    }
});


//rutas 
app.get('/', (req, res, next) => {

    res.status(200).send({
        ok: true,
        message: 'Peticion realizada correctamente!.'
    })
});


//Escuchar peticiones
app.listen(3000, () => {
    console.log('Escuchando desde el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
})