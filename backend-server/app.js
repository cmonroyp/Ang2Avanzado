//Requires 
var express = require('express');
var mongoose = require('mongoose');
//parsea los parametros que llegan por http 
var bodyParser = require('body-parser');


//Inicializar variables 
var app = express();


// ====== Body Parser =======
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


//importar rutas 
var appRoutes = require('./routes/app.route');
var usuarioRoutes = require('./routes/usuario.route');
var loginRoutes = require('./routes/login.route');
var hospitalRoutes = require('./routes/hospital.route');
var medicoRoutes = require('./routes/medico.route');
var busquedaRoutes = require('./routes/busqueda.route');
var uploadRoutes = require('./routes/upload.route');
var imagenesRoutes = require('./routes/imagenes.route');

//Conexion base de datos 
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) {
        console.log('Error en la Conexion  a la BD: ', err);
    } else {
        console.log('Base de datos : \x1b[32m%s\x1b[0m', 'online');
    }
});

//Server index muestra las imagenes indexadas desde la web de la carpeta upload.
// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));


//rutas 
app.use('/api', appRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', loginRoutes);
app.use('/api', hospitalRoutes);
app.use('/api', medicoRoutes);
app.use('/api', busquedaRoutes);
app.use('/api', uploadRoutes);
app.use('/api', imagenesRoutes);


//Escuchar peticiones
app.listen(3000, () => {
    console.log('Escuchando desde el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
})