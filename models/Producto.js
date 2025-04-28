const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'Productos',
  timestamps: false
});

module.exports = Producto;