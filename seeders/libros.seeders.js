const { Libro } = require('../models/relaciones');

async function inicializarLibros() {
  await Libro.bulkCreate([
    { nombre: 'El Código de las Estrellas', stock: 15, url_cover: '/images/covers/cover_id_1.png'},
    { nombre: 'Papelucho', stock: 30 },
    { nombre: 'El Perfume', stock: 23 },
    { nombre: 'Charlie y la Fabrica de Chocolates', stock: 30 },
    { nombre: 'Crónicas del Tiempo Perdido', stock: 0, url_cover: '/images/covers/cover_id_5.png'},
    { nombre: 'Las Crónicas de Narnia', stock: 19 },
    { nombre: 'El Principito', stock: 15 },
    { nombre: 'Cementerio de Animales', stock: 16 },
    { nombre: 'Las Crónicas de Spiderwick', stock: 30 },
    { nombre: 'La Brújula Dorado', stock: 10 },
    { nombre: 'El Atlas Esmeralda', stock: 35 },
    { nombre: 'Emilia y la Dama Negra', stock: 10 },
    { nombre: 'Veinte mil leguas de viaje submarino', stock: 22 },
    { nombre: 'Pearcy Jackson y los Dioses del Olimpo', stock: 19 },
    { nombre: 'Furía de Titanes', stock: 1 },
  ]);

  console.log("Libros de prueba añadidos a la base de datos.");
}

module.exports =  inicializarLibros;