//modelo
var Hospital = require('../models/hospital');

// =========================================================
// funcion que retorna los hopsitales de la BD.
// =========================================================
function getHospitales(req, res) {

    var desde = req.params.desde || 0;
    desde = Number(desde);

    Hospital.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .exec(
            (err, hospitales) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando hospital',
                        errors: err
                    });
                }

                Hospital.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        hospitales: hospitales,
                        total: conteo
                    });
                })

            });
}

// =========================================================
// funcion que retorna los hopsitales sin paginado
// =========================================================
function getHospitales_NoPaging(req, res) {

    Hospital.find({})
        .populate('usuario', 'nombre email')
        .exec(
            (err, hospitales) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando hospital',
                        errors: err
                    });
                }

                Hospital.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        hospitales: hospitales,
                        total: conteo
                    });
                })

            });
}

// =========================================================
// buscar hospital por id!.
// =========================================================

function buscaHospitalId(req, res) {
    var id = req.params.id;

    Hospital.findById(id)
        .populate('usuario', 'nombre img email')
        .exec((err, hospital) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    mensaje: 'Error al buscar hospital',
                    errors: err
                });
            }
            if (!hospital) {
                return res.status(400).send({
                    ok: false,
                    mensaje: 'El hospital con el id ' + id + 'no existe',
                    errors: { message: 'No existe un hospital con ese ID' }
                });
            }
            res.status(200).send({
                ok: true,
                hospital: hospital,
            });
        })
}


// =========================================================
// funcion para crear un hospital
// =========================================================
function crearHospital(req, res) {

    let params = req.body;

    let hospital = new Hospital({
        nombre: params.nombre,
        img: params.img,
        usuario: req.user.usuario.id //id recogido del jwt y middleware
    });

    hospital.save((err, save_hospital) => {

        if (err) {
            return res.status(500).send({
                ok: false,
                message: 'Error con el servidor al guardar el hospital',
                errors: err
            });
        }

        if (!save_hospital) {
            return res.status(400).send({
                ok: false,
                message: 'Error al crear el hospital!.'
            });
        } else {
            res.status(201).send({
                ok: true,
                hospital: save_hospital
            });
        }
    });
}

// =========================================================
// actualiza un hospital
// =========================================================
function actualizaHospital(req, res) {

    let hospital_id = req.params.id;
    let update = req.body;

    Hospital.findByIdAndUpdate(hospital_id, update, { new: true }, (err, update_hospital) => {

        if (err) {
            return res.status(500).send({
                ok: false,
                message: 'Error con el servidor al actualzar el hospital',
                errors: err
            });
        }

        if (!update_hospital) {
            return res.status(404).send({
                ok: false,
                message: 'No fue posible actualizar el hospital!.'
            });
        } else {
            res.status(200).send({
                ok: true,
                hospital: update_hospital
            });
        }
    });
}

// =========================================================
// funcion para eliminar un hosiptal
// =========================================================
function eliminaHospital(req, res) {

    let hospital_id = req.params.id;

    Hospital.findByIdAndRemove(hospital_id, (err, delete_hospital) => {

        if (err) {
            return res.status(500).send({ message: 'Error con el Serividor al Eliminar el Hospital!.', err })
        }

        if (!delete_hospital) {
            res.status(404).send({ message: 'Hospital no encontrado y no Eliminado!.' });
        } else {
            res.status(200).send({
                ok: true,
                message: { 'Hospital Eliminado!.': delete_hospital }
            });
        }
    });
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizaHospital,
    eliminaHospital,
    getHospitales_NoPaging,
    buscaHospitalId
}