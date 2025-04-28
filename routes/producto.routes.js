const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/producto.controller');

router.post('/', ProductoController.crearProducto);
router.get('/', ProductoController.obtenerProductos);

module.exports = router;