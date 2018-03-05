//modelo
var Medico = require('../models/medico');
//Paginacion 
var mongoosePaginate = require('mongoose-pagination');

// =========================================================
// funcion que retorna los medicos de la BD.
// =========================================================
function getMedicos(req, res) {

    let desde = req.params.desde || 0; //en caso que no venga la pagina muestra la primera.
    desde = Number(desde); //hardcodea la variable para que se numeral
    let limitPage = 4; //registros que se mostrara por pagina.

    Medico.find({}).sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('hospital')
        .paginate(desde, limitPage, (err, findMedicos, count_medicos) => {

            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error en la peticion de busqueda con el Servidor!.',
                    errors: err
                });
            }

            if (!findMedicos) {
                res.status(404).send({ message: 'Medicos no encontrados!.' });
            } else {
                res.status(200).send({
                    ok: true,
                    message: findMedicos,
                    total: count_medicos
                })
            }

        });

    // Medico.find({}, (err, findMedicos) => {
    //     if (err) {
    //         return res.status(500).send({
    //             ok: false,
    //             message: 'Error en la peticion de busqueda con el Servidor!.',
    //             errors: err
    //         });
    //     }

    //     if (!findMedicos) {
    //         res.status(404).send({ message: 'Medicos no encontrados!.' });
    //     } else {
    //         res.status(200).send({
    //             ok: true,
    //             message: findMedicos
    //         })
    //     }
    // })
}

// =========================================================
// funcion para crear un medico
// =========================================================
function crearMedico(req, res) {

    let params = req.body;

    let medico = new Medico({
        nombre: params.nombre,
        img: params.img,
        usuario: req.user.usuario.id, //id recogido del jwt y middleware
        hospital: params.hospital
    });


    medico.save((err, save_medico) => {

        if (err) {
            return res.status(500).send({
                ok: false,
                message: 'Error con el servidor al guardar el medico',
                errors: err
            });
        }

        if (!save_medico) {
            return res.status(400).send({
                ok: false,
                message: 'Error al crear el medico!.'
            });
        } else {
            res.status(201).send({
                ok: true,
                medico: save_medico
            });
        }
    });
}

// =========================================================
// actualiza un medico
// =========================================================
function actualizaMedico(req, res) {

    let medico_id = req.params.id;
    let update = req.body;

    Medico.findByIdAndUpdate(medico_id, update, { new: true }, (err, update_medico) => {

        if (err) {
            return res.status(500).send({
                ok: false,
                message: 'Error con el servidor al actualzar el medico',
                errors: err
            });
        }

        if (!update_medico) {
            return res.status(404).send({
                ok: false,
                message: 'No fue posible actualizar el medico!.'
            });
        } else {
            res.status(200).send({
                ok: true,
                medico: update_medico
            });
        }
    });
}

// =========================================================
// funcion para eliminar un medico
// =========================================================
function eliminaMedico(req, res) {

    let medico_id = req.params.id;

    Medico.findByIdAndRemove(medico_id, (err, delete_medico) => {

        if (err) {
            return res.status(500).send({ message: 'Error con el Serividor al Eliminar el Medico!.', err })
        }

        if (!delete_medico) {
            res.status(404).send({ message: 'Medico no encontrado y no Eliminado!.' });
        } else {
            res.status(200).send({
                ok: true,
                message: { 'Medico Eliminado!.': delete_medico }
            });
        }
    });
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizaMedico,
    eliminaMedico
}