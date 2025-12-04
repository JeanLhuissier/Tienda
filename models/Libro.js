const sequelize = require('../config/database');
const { DataTypes } = require('sequelize'); 

const Libro = sequelize.define('Libro', {
    nombre : {
        type : DataTypes.STRING,
        allowNull : false,
        validate: {
            notEmpty: true,
        }
    },
    stock : {
        type : DataTypes.INTEGER,
        allowNull : false,
        validate: {
            isInt: true,  // stock debe ser entero
            min: 0,       // stock debe ser positivo o cero
        }
    },
    url_cover : {
        type : DataTypes.STRING,
        default : null,
    }
});

module.exports = Libro;