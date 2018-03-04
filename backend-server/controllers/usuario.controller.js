var bcrypt = require('bcrypt-nodejs'); //encripta la contraseña en la bd.
//modelo
var Usuario = require('../models/usuario');

// =========================================================
// Funcion que retorna todos los usuarios
// =========================================================
function getUsuarios(req, res) {

    Usuario.find({}, 'nombre email img role').sort('nombre')

    .exec((err, findUsuarios) => {

        if (err) {
            return res.status(500).send({
                ok: false,
                message: 'Error en la Peticion con el Servidor!.',
                errors: err
            });
        }

        if (!findUsuarios) {
            res.status(404).send({ message: 'Lista de Usuarios no Encontrada!.' });
        } else {
            res.status(200).send({
                ok: true,
                usuarios: findUsuarios,
                usuariotoken: req.user //decodificado en el middleware.
            })
        }
    });
}


// =========================================================
//  Funcion para crear un nuevo usuario
// =========================================================
function crearUsuario(req, res) {
    let usuario = new Usuario();
    let params = req.body;

    usuario.nombre = params.nombre;
    usuario.email = params.email;
    usuario.password = params.password;
    usuario.img = params.img;
    usuario.role = params.role;

    console.log(usuario);
    if (params.password) {

        bcrypt.hash(usuario.password, null, null, (err, hash) => {
            usuario.password = hash;

            usuario.save((err, add_usuario) => {
                if (err) {
                    res.status(400).send({ messge: 'Error al crear Usuario!.', err });
                } else {
                    res.status(201).send({
                        ok: true,
                        usuario: add_usuario
                    })
                }
            });
        });

    }
}

// =========================================================
// Actualizar un usuario
// =========================================================
function actualizarUsuario(req, res) {

    let usuario_id = req.params.id;
    let update = req.body;

    Usuario.findByIdAndUpdate(usuario_id, update, { new: true }).select('nombre email img role')
        .exec((err, update_usuario) => {

            if (err) {
                res.status(500).send({ message: 'Error con el Serividor al actualizar el usuario!.', err })
            } else {
                if (!update_usuario) {
                    res.status(404).send({ message: 'El usuario a actualizar no existe!.' });
                } else {
                    res.status(200).send({
                        ok: true,
                        usuario: update_usuario
                    });
                }
            }
        });



    // Usuario.findByIdAndUpdate(usuario_id, update, { new: true }, (err, update_usuario) => {

    //     if (err) {
    //         res.status(500).send({ message: 'Error con el Serividor al actualizar el alumno!.', err })
    //     } else {
    //         if (!update_usuario) {
    //             res.status(404).send({ message: 'El usuario a actualizar no existe!.' });
    //         } else {
    //             res.status(200).send({
    //                 ok: true,
    //                 usuario: update_usuario
    //             });
    //         }
    //     }
    // })
}

// =========================================================
// Eliminar Usuario
// =========================================================

function eliminarUsuario(req, res) {

    let usuario_id = req.params.id;

    Usuario.findByIdAndRemove(usuario_id, (err, delete_usuario) => {

        if (err) {
            return res.status(500).send({ message: 'Error con el Serividor al Eliminar el Usuario!.', err })
        }

        if (!delete_usuario) {
            res.status(404).send({ message: 'Usuario no encontrado y no Eliminado!.' });
        } else {
            res.status(200).send({
                ok: true,
                message: { 'Usuario Eliminado': delete_usuario }
            })
        }
    })
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}