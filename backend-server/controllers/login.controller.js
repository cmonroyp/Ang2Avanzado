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
                        //id: usuario._id,
                        menu: obtenerMenu(usuario.role)
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
                        menu: obtenerMenu(usuarioDB.role)
                    });

                });
            }
        });
    });

}

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
            return res.status(500).send({
                ok: false,
                mensaje: 'Error con el servidor al buscar usuario!.',
                errors: err
            });
        }

        if (!findUsuario) {
            console.log('Error API Autenticacion')
            return res.status(400).send({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: err
            });
        } else {
            //Comparo el password enviado, con el del usuario encontrado
            bcrypt.compare(password, findUsuario.password, (err, check) => {

                if (!check) {
                    return res.status(400).send({
                        ok: false,
                        mensaje: 'Credenciales incorrectas',
                        errors: err
                    });
                }

                //se genera un Token
                res.status(200).send({
                        ok: true,
                        usuario: findUsuario,
                        token: jwt.createToken(findUsuario),
                        menu: obtenerMenu(findUsuario.role)
                    })
                    //id: usuarioDB._id,
            })
        }
    })
}

function obtenerMenu(ROLE) {

    var menu = [{
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            subMenu: [
                { titulo: 'Dashboard', url: '/dashboard' },
                { titulo: 'Progress', url: '/progress' },
                { titulo: 'Graficas1', url: '/graficas1' },
                { titulo: 'Promesas', url: '/promesas' },
                { titulo: 'Rxjs', url: '/rxjs' },
            ]
        },
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            subMenu: [
                // { titulo: 'Usuarios', url: '/usuarios' },
                { titulo: 'Hospitales', url: '/hospitales' },
                { titulo: 'Medicos', url: '/medicos' }
            ]
        }
    ];

    if (ROLE === 'ADMIN_ROLE') {
        menu[1].subMenu.unshift({ titulo: 'Usuarios', url: '/usuarios' })
    }
    return menu;
}

// =========================================================
// Logica para renovar el Token
// =========================================================

function renuvaToken(req, res){

    res.status(200).send({
        ok: true,  
        token: jwt.createToken(req.user)
    })
}

module.exports = {
    loginUsuario,
    autenticacionGoogle,
    renuvaToken
}