const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PedidoProducto = sequelize.define('PedidoProducto', {
  cantidadpedida: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  cantidadenviada: {
    type: DataTypes.DECIMAL(10,2)
  },
  
}, {
  tableName: 'PedidoProducto',
  timestamps: false
});

module.exports = PedidoProducto;