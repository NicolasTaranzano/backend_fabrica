const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/pedido.controller');

router.post('/', PedidoController.crearPedido);
router.get('/', PedidoController.obtenerPedidos);
router.put('/:id/enviar', PedidoController.actualizarPedido);
router.get('/usuario/:usuario_id', PedidoController.obtenerPedidosPorUsuarioId);
router.put('/:id/recibir', PedidoController.marcarPedidoRecibido);


module.exports = router;