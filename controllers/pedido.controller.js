const { Pedido, Usuario, Producto, PedidoProducto } = require('../models');

exports.crearPedido = async (req, res) => {
  const { fecha, estado, usuario_id, productos } = req.body;

  try {
    const pedido = await Pedido.create({ fecha, estado, usuario_id });

    for (const producto of productos) {
      await PedidoProducto.create({
        pedido_id: pedido.id,
        producto_id: producto.producto_id,
        cantidadpedida: producto.cantidadpedida,
        cantidadenviada: producto.cantidadenviada,
        
      });
    }

    res.status(201).json({ message: "Pedido creado correctamente", pedido });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [
        {
          model: Producto,
          through: { attributes: ['cantidadpedida', 'cantidadenviada'] }
        },
        {
          model: Usuario,
          attributes: ['nombre']
        }
      ]
    });
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizarPedido = async (req, res) => {
  const { id } = req.params;
  const { productos } = req.body;

  try {
    if (productos && Array.isArray(productos)) {
      for (const producto of productos) {
        await PedidoProducto.update(
          { cantidadenviada: producto.cantidadenviada },
          {
            where: {
              pedido_id: id,
              producto_id: producto.productoId
            }
          }
        );
      }
    }

    await Pedido.update(
      { estado: 'enviado' },
      { where: { id, estado: 'pendiente' } }
    );

    res.status(200).json({ message: 'Pedido actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// NUEVA FUNCIÓN PARA MARCAR COMO RECIBIDO
exports.marcarPedidoRecibido = async (req, res) => {
  const { id } = req.params;

  try {
    await Pedido.update(
      { estado: 'recibido' },
      { where: { id, estado: 'enviado' } }
    );
    res.status(200).json({ message: 'Pedido marcado como recibido' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obtenerPedidosPorUsuarioId = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const pedidos = await Pedido.findAll({
      where: { usuario_id },
      include: [
        {
          model: Producto,
          through: { attributes: ['cantidadpedida', 'cantidadenviada'] }
        }
      ]
    });

    if (pedidos.length === 0) {
      return res.status(404).json({ error: 'No se encontraron pedidos para este usuario' });
    }

    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
