const Usuario = require('./Usuario');
const Libro = require('./Libro');   
const Compra = require('./Compra');

// Usuario realiza muchas Compras
// Una Compra pertenece a un Usuario
Usuario.hasMany(Compra); 
Compra.belongsTo(Usuario);

// Libro se asocia a muchas Compras
// Una Compra esta asociada a un Libro
Libro.hasMany(Compra);
Compra.belongsTo(Libro);

module.exports ={
    Usuario,
    Libro,
    Compra
}