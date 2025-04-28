const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING(50)
  },
  rol: {
    type: DataTypes.ENUM('Garibaldi', 'Juan de Garay', 'Administrador', 'Produccion'),
    allowNull: false
  }
}, {
  tableName: 'Usuarios',
  timestamps: false
});

module.exports = Usuario;