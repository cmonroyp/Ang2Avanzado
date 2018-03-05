//modelo
var Hospital = require('../models/hospital');

// =========================================================
// funcion que retorna los hopsitales de la BD.
// =========================================================
function getHospitales(req, res) {

    let desde = req.params.desde || 0; //en caso que no venga la pagina muestra la primera.
    desde = Number(desde);
    let limitPage = 4; //registros que se mostrara por pagina.

    Hospital.find({})
        .populate('usuario', 'nombre email')
        .paginate(desde, limitPage, (err, findHospital, count_hospitales) => {

            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error en la peticion de busqueda con el Servidor!.',
                    errors: err
                });
            }

            if (!findHospital) {
                res.status(404).send({ message: 'Hospitales no encontrados!.' });
            } else {
                res.status(200).send({
                    ok: true,
                    message: findHospital,
                    total: count_hospitales
                });
            }
        });
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
                usuario: save_hospital
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
    eliminaHospital
}