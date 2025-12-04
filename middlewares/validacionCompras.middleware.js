const ErrorExtendido = require("../utils/ErrorExtendido");

const validarIdCompra = (req, res, next) => {
    req.body.cantidad = parseInt(req.body.cantidad);
    const idLibro = req.params.id;

    // Validación del ID del libro
    const idNumerico = parseInt(idLibro);
    
    if (!idLibro || isNaN(idNumerico) || idNumerico <= 0)
        return next(new ErrorExtendido('ID de libro inválido o faltante.', 'Error Validacion(Servidor)', 400));

    req.params.id = idNumerico
    next();
}

module.exports = { validarIdCompra };