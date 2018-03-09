var path = require('path');
var fs = require('fs');

// =========================================================
// funcion para mostrar imagenes, en caso de no existir muestra una por defecto.
// =========================================================
function showImages(req, res) {

    var tipo = req.params.tipo;
    var img = req.params.img;

    var pathImage = `./uploads/${tipo}/${img}`;

    if (!fs.existsSync(pathImage)) {
        pathImage = './assets/img/no-img.jpg';
    }
    res.sendFile(path.resolve(pathImage));
}

module.exports = {
    showImages,
}