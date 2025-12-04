const bcrypt = require('bcryptjs');
const { expressjwt } = require('express-jwt');
const ErrorExtendido = require('../utils/ErrorExtendido');

const SECRET_KEY = process.env.SECRET_KEY; 

// Middleware verificar y validar un JWT
const autenticarToken = expressjwt({
    secret: SECRET_KEY,
    algorithms: ["HS256"],
});

// Middleware encriptación contraseña
const encriptarPassword = async(req, res, next) => {
    try {
        // Encriptar Password
        req.body.password = await bcrypt.hash(req.body.password, 10);
        // Pasar al siguiente middleware en el flujo normal de ejecución
        return next();
    } catch (error) {
        // Detener flujo normal de ejecución de middleware y saltar inmediatamente a las funciones de manejo de errores
        return next(new ErrorExtendido('Problemas al encriptar password'));
    }
}

// Middleware para manejar errores de express-jwt.
const errorAutenticacionMdw = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError')
        return next(new ErrorExtendido(err.message,'Error de Autenticacion(express-jwt)',401));

    return next(err);
}

module.exports = {
    autenticarToken,
    encriptarPassword,
    errorAutenticacionMdw
};
