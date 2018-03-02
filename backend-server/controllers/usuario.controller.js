var Usuario = require('../models/usuario');

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
                usuarios: findUsuarios
            })
        }
    });
}

module.exports = {
    getUsuarios,
}