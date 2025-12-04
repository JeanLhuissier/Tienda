const sequelize = require('../config/database');
const { DataTypes } = require('sequelize'); 

const Usuario = sequelize.define('Usuario', {
    username : {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Usuario;