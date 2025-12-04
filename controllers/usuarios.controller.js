const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const ErrorExtendido = require('../utils/ErrorExtendido');

const SECRET_KEY = process.env.SECRET_KEY; 

// Registra un nuevo usuario. 
async function registrarUsuario(req, res, next) {
    const { username, password } = req.body;
        
    try {
        // La contraseña ya ha sido encriptada por encriptarPassword
        const usuarioCreado = await Usuario.create({ username, password });

        // Generar Token para el nuevo usuario
        const token = jwt.sign(
            { id: usuarioCreado.id, username: usuarioCreado.username },
            SECRET_KEY,
            { expiresIn: '2h' } 
        );

        return res.status(201).json({ 
            message: "Nuevo usuario creado con exito.", 
            token,
            usuario: {
                id: usuarioCreado.id,
                username: usuarioCreado.username,
            }
        });

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Si es un error de validación de Sequelize
            const errors = error.errors.map(err => ({
                field: err.path,
                message: err.message,
            }));

            return next(new ErrorExtendido('Error Validación', 'SequelizeValidationError', 400, errors));

        } else if (error.name === 'SequelizeUniqueConstraintError') {
            // Si es un error de restricción de unicidad (similar a una validación)
            const errors = error.errors.map(err => ({
                field: err.path,
                message: `El valor '${err.value}' para el campo '${err.path}' ya está en uso.`,
            }));

            return next(new ErrorExtendido('El registro ya existe', 'SequelizeUniqueConstraintError', 409, errors));
        }

        // Errores no asociados a validación y restricciones de sequelize
        return next(error);
    }
}

// Iniciar sesión
async function loginUsuario(req, res, next) {
    const usuario = req.usuario; 

    try {
        // Generar Token para el usario con login válido
        const token = jwt.sign(
            { id: usuario.id, username: usuario.username },
            SECRET_KEY,
            { expiresIn: '2h' }
        );

        delete usuario.password;

        return res.status(200).json({ 
            message: "Login Exitoso.", 
            token,
            usuario: usuario
        });

    } catch (error) {        
        return next(error);
    }
}

function mostrarRegistro(req, res) {
    res.render('registro', { title: "Registro de Usuario" });
}

function mostrarLogin(req, res) {
    res.render('login', { title: "Inicio de Sesión" });
}

module.exports = {
    registrarUsuario,
    loginUsuario,
    mostrarRegistro,
    mostrarLogin
}