//Token
var jwt = require('jsonwebtoken');
//config 
var semilla = require('../config/config').SEED;




//el parametro alumno es el que se envia desde el metodo de loginAlumno del controlador.
exports.createToken = (usuario) => {

    var payload = {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        img: usuario.img,
        role: usuario.role

    };

    return jwt.sign({ usuario: payload }, semilla, { expiresIn: '4h' }); //codifica la informacion.
}