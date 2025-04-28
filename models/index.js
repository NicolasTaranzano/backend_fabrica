const Usuario = require('./Usuario');
const Pedido = require('./Pedido');
const Producto = require('./Producto');
const PedidoProducto = require('./PedidoProducto');

// Relaciones
Usuario.hasMany(Pedido, { foreignKey: 'usuario_id' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Pedido.belongsToMany(Producto, {
  through: PedidoProducto,
  foreignKey: 'pedido_id',
  otherKey: 'producto_id'
});

Producto.belongsToMany(Pedido, {
  through: PedidoProducto,
  foreignKey: 'producto_id',
  otherKey: 'pedido_id'
});

module.exports = {
  Usuario,
  Pedido,
  Producto,
  PedidoProducto
};