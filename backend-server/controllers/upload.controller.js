//modelos
var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Usuario = require('../models/usuario');

var fs = require('fs');

// =========================================================
// funcion para subir imagenes
// =========================================================
function uploadFiles(req, res) {

    var tipo = req.params.tipo;
    var id = req.params.id;

    // tipos de colección
    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no es válida',
            errors: { message: 'Tipo de colección no es válida' }
        });
    }

    if (!req.files) {
        return res.status(400).send({
            ok: false,
            message: 'No selecciono nada!.',
            errors: { message: 'Debe de seleccionar una imagen!.' }
        });
    }

    //obtener nombre del archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var ext_archivo = nombreCortado[nombreCortado.length - 1]; //obentenes la ultima posicion

    // Sólo estas extensiones aceptamos
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(ext_archivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no válida',
            errors: { message: 'Las extensiones válidas son ' + extensionesValidas.join(', ') }
        });
    }

    // Nombre de archivo personalizado
    // 12312312312-123.png
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ ext_archivo }`;

    //mover archivo a un path especifico
    var path = `./uploads/${ tipo }/${ nombreArchivo }`;

    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });

        }

        subirPorTipo(tipo, id, path, nombreArchivo, res);

        // res.status(200).json({
        //     ok: true,
        //     mensaje: 'Archivo movido',
        //     extensionArchivo: ext_archivo
        // });
    });
}

function subirPorTipo(tipo, id, path, nombreArchivo, res) {

    var tipoColeccion;

    switch (tipo) {
        case 'hospitales':
            tipoColeccion = Hospital;
            break;
        case 'medicos':
            tipoColeccion = Medico;
            break;
        case 'usuarios':
            tipoColeccion = Usuario;
            break;
        default:
            return;
    }


    tipoColeccion.findById(id, 'nombre img email')
        .exec((err, resultado) => {

            if (!resultado) {
                fs.unlinkSync(path); // Borro el archivo cuando no tengo id valido
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No se encontro registro',
                    errors: { message: 'Debe selecionar un Id valido', err }
                });
            } else {
                var pathViejo = resultado.img;

                // Si existe, Elimino la imagen vieja
                if (fs.existsSync(pathViejo)) {
                    fs.unlink(pathViejo);
                }

                resultado.img = nombreArchivo;
                resultado.save((err, resultadoActualizado) => {
                    res.status(200).json({
                        ok: true,
                        [tipo]: resultadoActualizado,
                        mensaje: 'Imagen de ' + tipo + ' actualizada'
                    });
                });
            }
        });
}

module.exports = {
    uploadFiles
}