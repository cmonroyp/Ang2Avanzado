var jwt = require('jsonwebtoken');

var semilla = require('../config/config').SEED;

// =========================================================
// Verifica Token!.
// =========================================================
exports.ensureAuth = function(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'La peticion no tiene la cabecera de autenticacion.' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, ''); //recoge el token del usuario y reemplaza si viene con comillas.

    try {
        var payload = jwt.verify(token, semilla);

    } catch (ex) {

        if (ex.message === 'jwt expired') {
            return res.status(401).send({ message: 'El token ha Expirado!.', error: ex });
        } else {
            return res.status(401).send({ message: 'El token no es valido!.', error: ex });
        }
    }

    req.user = payload; //datos del usuario identificado en el token.
    next();
}

// =========================================================
// Verifica Role Admin!.
// =========================================================
exports.verificaADMIN_ROLE = function(req, res, next) {

    var usuario = req.user.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.status(401).send({
            ok: false,
            message: 'No posee permisos para acceder!.'
        });
    }
}

// ==========================================
//  Verificar ADMIN o Mismo Usuario
// ==========================================
exports.verificaADMIN_o_MismoUsuario = function(req, res, next) {


    var usuario = req.user.usuario;
    var id = req.params.id;
    if (usuario.role === 'ADMIN_ROLE' || usuario.id === id) {
        next();
        return;
    } else {

        return res.status(401).json({
            ok: false,
            mensaje: 'No posee los privilegios para esta accion!.',
        });

    }
}