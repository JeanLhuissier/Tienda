const sequelize = require('../config/database');
const { DataTypes } = require('sequelize'); 

const Compra = sequelize.define('Compra', {
    cantidad : {
        type : DataTypes.INTEGER,
        allowNull : false,
        validate: {
            isInt: true, // cantidad debe ser entero
            min: 1,      // cantidad debe ser mayor o Igual a 1
        }
    }
});

module.exports = Compra;

