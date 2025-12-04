const Usuario = require('../models/Usuario');
const ErrorExtendido = require('../utils/ErrorExtendido');
const bcrypt = require('bcryptjs');

const validarPassword = (req, res, next) => {
    req.body.username = req.body.username.trim();
    req.body.password = req.body.password.trim();
    
    const { password } = req.body;
    const errores = [];

    // Validación de Password
    if (!password || typeof password !== 'string') {
        errores.push({ field: 'password', message: 'La contraseña es obligatoria o no es un string' });
    } else {
        if (password.length < 10 || password.length > 32) {
            errores.push({ field: 'password', message: 'Largo contraseña debe ser entre 10 y 16 caracteres' });
        }
        if (!/[A-Z]/.test(password)) {
            errores.push({ field: 'password', message: 'La contraseña debe tener al menos una letra mayúscula' });
        }
        if (!/[a-z]/.test(password)) {
            errores.push({ field: 'password', message: 'La contraseña debe tener al menos una letra minúscula' });
        }
        if (!/[0-9]/.test(password)) {
            errores.push({ field: 'password', message: 'La contraseña tener al menos un número' });
        }
    }

    if (errores.length > 0) {
        // Desviar a manipulacion de errores
        return next(new ErrorExtendido('Password Inválido','Error Validación(Servidor)', 400, errores));
    }

    return next();
}

const validarLogin = async(req, res, next) => {
    req.body.username = req.body.username.trim();
    req.body.password = req.body.password.trim();
    
    const { username, password } = req.body;
    const errores = [];

    if (!username)
        errores.push({field:'username', message:'Falta ingresar nombre usuario'}); 

    if (!password)
        errores.push({field:'password', message:'Falta ingresar password'});  

    if (errores.length > 0) {
        // Desviar a manipulacion de errores
        return next(new ErrorExtendido('Credenciales Faltantes','Error Validación(Servidor)', 400, errores));
    }

    try {
        const usuario = await Usuario.findOne({ where: { username } });

        if (!usuario)
            throw new ErrorExtendido('Credenciales inválidas','Usuario no existente(Login)', 401);
        
        const passwordValido = await bcrypt.compare(password, usuario.password);

        if (!passwordValido)
            throw new ErrorExtendido('Credenciales inválidas','Password Erroneo(Login)', 401);

        // Agregar usuario validado a req
        req.usuario = usuario.toJSON();
        
        return next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    validarPassword,
    validarLogin,
}