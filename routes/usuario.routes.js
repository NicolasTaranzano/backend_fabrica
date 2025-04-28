const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');

router.post('/', UsuarioController.crearUsuario);
router.get('/', UsuarioController.obtenerUsuarios);
router.get('/:id', UsuarioController.obtenerUsuarioPorId)

module.exports = router;