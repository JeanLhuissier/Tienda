const { Router } = require('express');
const { validarPassword, validarLogin } = require('../middlewares/validacionUsuarios.middleware');
const { encriptarPassword } = require('../middlewares/seguridad.middleware');
const { registrarUsuario, loginUsuario, mostrarRegistro, mostrarLogin} = require('../controllers/usuarios.controller');

const routerUsuarios = Router();

routerUsuarios.get('/registro', mostrarRegistro);
routerUsuarios.get('/login', mostrarLogin);

routerUsuarios.post('/registro', validarPassword, encriptarPassword, registrarUsuario);
routerUsuarios.post('/login', validarLogin, loginUsuario);

module.exports = routerUsuarios;