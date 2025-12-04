const ErrorExtendido = require('../utils/ErrorExtendido');

const erroresMdw = (err, req, res, next) => {
    // Mostrar error en consola servidor
    console.error('\nMiddleware de errores:\n');
    console.error(`${err.stack}`);
    
    let errorCapturado = err;
    
    // Convertir el error genérico propagado en un error extendido
    if (!(err instanceof ErrorExtendido)) {
        // Para errores no capturados (ej. errores de base de datos o sintaxis)
        errorCapturado = new ErrorExtendido(err.message || 'Error interno del servidor', 'Error Interno Servidor', 500);
    }

    let detalles = [];

    if (errorCapturado.detalles.length > 0){
        console.error('\nDetalles:\n');
        detalles = errorCapturado.detalles.map(detalle => `${detalle.field}: ${detalle.message}`);
        console.table(detalles);
    }

    res.status(errorCapturado.statusCode);
    
    const respuestaJson = true;

    if (respuestaJson) {
        // Respuesta JSON (para formularios o API)
        const respuestaJson = { 
            name: errorCapturado.name, 
            error: errorCapturado.message,
            detalles: detalles
        };

        return res.json(respuestaJson);
    }
}

module.exports = erroresMdw;