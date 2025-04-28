const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pedido = sequelize.define('Pedido', {
  fecha: {
    type: DataTypes.DATEONLY
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'enviado', 'recibido'),
    defaultValue: 'pendiente'
  }
}, {
  tableName: 'Pedidos',
  timestamps: false
});

module.exports = Pedido;