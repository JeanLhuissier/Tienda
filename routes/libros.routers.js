const { Router } = require('express');
const { autenticarToken } = require('../middlewares/seguridad.middleware');
const { validarIdCompra } = require('../middlewares/validacionCompras.middleware');
const { mostrarLibros, mostrarCompra, comprarLibro } = require('../controllers/libros.controller');

const routerLibros = Router();

// Ruta de la vista de libros (GET /libros)
routerLibros.get('/catalogo', mostrarLibros);

// Vista del formulario de compra
routerLibros.get('/:id/comprar', mostrarCompra);

// Ruta para realizar una compra (POST /libros/:id/comprar)
routerLibros.post('/:id/comprar', autenticarToken, validarIdCompra, comprarLibro);

module.exports = routerLibros;