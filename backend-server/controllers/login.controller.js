var bcrypt = require('bcrypt-nodejs'); //encripta la contraseña en la bd.
//modelo
var Usuario = require('../models/usuario');
//Token
var jwt = require('../jwt/jwt');

// =========================================================
// Logica para Autenticacion en la Aplicacion
// =========================================================

function loginUsuario(req, res) {

    //let usuario = new Usuario();
    let params = req.body;

    let email = params.email;
    let password = params.password;

    Usuario.findOne({ email: email.toLowerCase() }, (err, findUsuario) => {

        if (err) {
            return res.status(500).send({ message: 'Error con el Servidor al buscar Usuario', err });
        }

        if (!findUsuario) {
            res.status(400).send({ message: 'Credenciales invalidas!.' });
        } else {
            //Comparo el password enviado, con el del usuario encontrado
            bcrypt.compare(password, findUsuario.password, (err, check) => {

                if (check) {
                    //se genera un Token
                    res.status(200).send({
                        ok: true,
                        token: jwt.createToken(findUsuario),
                    })
                }
            })
        }
    })
}


module.exports = {
    loginUsuario
}