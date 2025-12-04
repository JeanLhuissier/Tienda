class ErrorExtendido extends Error {
    constructor(mensaje, name="Error Servidor", statusCode=500, detalles = []) {
        super(mensaje);
        this.name = name;
        this.statusCode = statusCode;
        this.detalles = detalles; // Array de errores específicos
    }
}

module.exports = ErrorExtendido;