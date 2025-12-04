const Libro = require("../models/Libro");
const Compra = require("../models/Compra");
const ErrorExtendido = require("../utils/ErrorExtendido");
const sequelize = require("../config/database");

// Renderizar la vista con el listado de libros.
const mostrarLibros = async(req, res, next) => { 
    try {
        const libros = await Libro.findAll({
            attributes: ['id', 'nombre', 'stock', 'url_cover'],
            order: [['nombre', 'ASC']]
        });

        const librosConEstado = libros.map(libro => ({
            ...libro.toJSON(),
            sinStock: libro.stock === 0
        }));

        res.render("catalogo", {
            title: "Catálogo Libros", 
            libros: librosConEstado,
        });

    } catch (error) {
        next(new ErrorExtendido("No se puede cargar la lista de libros", "Error Interno Servidor", 500));
    }
}

// Renderizar la vista de confirmación de compra (GET /libros/:id/comprar)
const mostrarCompra = async(req, res, next) => {
    const { id } = req.params;
    try {
        const libro = await Libro.findByPk(id, {
            attributes: ['id', 'nombre', 'stock', 'url_cover']
        });

        if(!libro) throw new ErrorExtendido("Libro no encontrado", "Error 404", 404);
        
        // const libroVista = {
        //     id: libro.id,
        //     nombre: libro.nombre,
        //     url_cover: libro.url_cover,
        //     stock: libro.stock
        // };

        res.render('compra', { 
            title: `Comprar ${libro.nombre}`,
            libro: libro.toJSON() 
        });

    } catch (error) {
        next(error);
    }
}

// Realizar transacción de compra POST /api/libros/:id/comprar
const comprarLibro = async(req, res, next) => {
    const { id: idLibro } = req.params;
    const { cantidad } = req.body;
    const idUsuario = req.auth.id;
    
    // Declarar la transacción de compra
    let compra; 

    try {
        // INICIAR EXPLÍCITAMENTE la transacción
        compra = await sequelize.transaction();

        // Bloquear el libro involucrado en la transacción 'compra'
        const libro = await Libro.findByPk(idLibro, {
            attributes: ['id', 'nombre', 'stock'],
            lock: compra.LOCK.UPDATE,
            transaction: compra, // ¡Importante! Pasar la transacción
        });

        if (!libro)
            throw new ErrorExtendido(`Libro ID ${idLibro} no encontrado`, 'Recurso No Encotrado', 404);

        const stockDisponible = libro.stock;

        // Verificar stock
        if (stockDisponible < cantidad)
            throw new ErrorExtendido(`No hay stock suficiente`,'Error Validacion', 400, [{ field: 'cantidad', message: `Stock Insuficiente. Solo quedan ${libro.stock} unidades.` }]);

        // Registrar de la compra
        await Compra.create({
            UsuarioId: idUsuario,
            LibroId: idLibro,
            cantidad: cantidad,
        }, { transaction: compra });

        // Descontar cantidad comprada del stock
        libro.stock = stockDisponible - cantidad;
        await libro.save({ transaction: compra });

        // CONFIRMAR EXPLÍCITAMENTE
        await compra.commit(); 
        
        const resultado = {
            message: `Compra exitosa. Se han comprado ${cantidad} unidades de '${libro.nombre}'`,
            stockRestante: libro.stock
        };

        res.status(200).json(resultado);

    } catch (error) {
        // REVERTIR EXPLÍCITAMENTE la transacción en caso de error y si la transaccion sigue activa
        if (compra) {
            await compra.rollback(); 
        }

        if (error.name === 'SequelizeValidationError') {
            // Si es un error de validación de Sequelize
            const errors = error.errors.map(err => ({
                field: err.path,
                message: err.message,
            }));

            return next(new ErrorExtendido('Error Validación', 'SequelizeValidationError', 400, errors));
        }

        next(error);
    }
}

module.exports = {
    mostrarLibros,
    mostrarCompra,
    comprarLibro,
}