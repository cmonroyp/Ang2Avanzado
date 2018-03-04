var jwt = require('jsonwebtoken');

var semilla = require('../config/config').SEED;

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