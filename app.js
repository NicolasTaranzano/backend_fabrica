const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const sequelize = require('./config/db');
const { Usuario, Pedido, Producto, PedidoProducto } = require('./models');

const pedidoRoutes = require('./routes/pedido.routes'); 
const productoRoutes = require('./routes/producto.routes');
const usuarioRoutes = require('./routes/usuario.routes');

app.use(cors());
app.use(express.json());

// Rutas
app.use('/usuarios', usuarioRoutes);
app.use('/productos', productoRoutes);
app.use('/pedidos', pedidoRoutes); 

// Sincronización
sequelize.sync({ alter: false })
  .then(() => console.log('📦 Base de datos sincronizada'))
  .catch(err => console.error('❌ Error al sincronizar:', err));

const PORT = process.env.PORT || 3000;

// Cambié localhost a '0.0.0.0' para que sea accesible desde la red local
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor backend corriendo en http://0.0.0.0:${PORT}`);
});
