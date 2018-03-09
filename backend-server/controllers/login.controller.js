var bcrypt = require('bcrypt-nodejs'); //encripta la contraseña en la bd.
//modelo
var Usuario = require('../models/usuario');
//Token
var jwt = require('../jwt/jwt');

//Google
// const GoogleAuth = require("google-auth-library");
const GOOGLE_CLIENT_ID = require('../config/config').GOOGLE_CLIENT_ID;
const GOOGLE_SECRET = require('../config/config').GOOGLE_SECRET;


const { OAuth2Client } = require('google-auth-library');

function autenticacionGoogle(req, res, next) {

    var token = req.body.token;

    const oAuth2Client = new OAuth2Client(
        GOOGLE_CLIENT_ID,
        GOOGLE_SECRET
    );
    const tiket = oAuth2Client.verifyIdToken({
        idToken: token
    });

    tiket.then(data => {
        let payload = data.payload;
        // res.status(200).json({
        //     ok: true,
        //     tiket: data.payload
        // })
        Usuario.findOne({ email: payload.email }, (err, usuario) => {

            if (err) {
                return res.status(500).json({
                    ok: true,
                    mensaje: 'Error al buscar usuario - login',
                    errors: err
                });
            }

            if (usuario) {

                if (usuario.google === false) {
                    return res.status(400).json({
                        ok: true,
                        mensaje: 'Debe de usar su autenticación normal'
                    });
                } else {

                    usuario.password = ':)';

                    var token = jwt.createToken(usuario);
                    //jwt.sign({ usuario: usuario }, SEED, { expiresIn: 14400 }); // 4 horas
                    res.status(200).json({
                        ok: true,
                        usuario: usuario,
                        token: token,
                        id: usuario._id,
                        //menu: obtenerMenu(usuario.role)
                    });

                }

                // Si el usuario no existe por correo
            } else {

                var usuario = new Usuario({
                    nombre: payload.name,
                    email: payload.email,
                    password: ':)',
                    img: payload.picture,
                    google: true

                });

                usuario.save((err, usuarioDB) => {

                    if (err) {
                        return res.status(500).json({
                            ok: true,
                            mensaje: 'Error al crear usuario - google',
                            errors: err
                        });
                    }


                    var token = jwt.createToken(usuario);
                    //jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

                    res.status(200).json({
                        ok: true,
                        usuario: usuarioDB,
                        token: token,
                        id: usuarioDB._id,
                        // menu: obtenerMenu(usuarioDB.role)
                    });

                });
            }
        });
    });

}

// function autenticacionGoogle(req, res, next) {

//     var token = req.body.token;

//     const oAuth2Client = new OAuth2Client(
//         GOOGLE_CLIENT_ID,
//         GOOGLE_SECRET
//     );
//     const tiket = oAuth2Client.verifyIdToken({
//         idToken: token
//     });

//     Usuario.findOne({ email: payload.email }, (err, usuario) => {

//                 if (err) {
//                     return res.status(500).json({
//                         ok: true,
//                         mensaje: 'Error al buscar usuario - login',
//                         errors: err
//                     });
//                 }

//                 if (usuario) {

//                     if (usuario.google === false) {
//                         return res.status(400).json({
//                             ok: true,
//                             mensaje: 'Debe de usar su autenticación normal'
//                         });

//                     } else {

//                         usuario.password = ':)';

//                         var token = jwt.createToken(usuario);
//                         //jwt.sign({ usuario: usuario }, SEED, { expiresIn: 14400 }); // 4 horas

//                         res.status(200).json({
//                             ok: true,
//                             usuario: usuario,
//                             token: token,
//                             id: usuario._id,
//                             menu: obtenerMenu(usuario.role)
//                         });

//                     }


//             tiket.then(data => {
//                 res.status(200).json({
//                     ok: true,
//                     tiket: data.payload
//                 })
//             });

//         }
// }
// =========================================================
// Logica para Autenticacion en la Aplicacion Normal
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
    loginUsuario,
    autenticacionGoogle
}