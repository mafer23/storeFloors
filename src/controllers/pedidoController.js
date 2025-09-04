import { createPedido, addDetallePedidoProducto,getDetallesPedido,  getAllPedidosService, 
  getPedidosByUsuarioService, 
  getPedidoWithDetallesService  } from "../services/pedidoService.js";


export async function createPedidoController(req, res) {
  try {
    const { fecha_pedido, id_estado_pedido, id_usuario, productos } = req.body;

    const newPedido = await createPedido({ fecha_pedido, id_estado_pedido, id_usuario });

    if (productos && productos.length > 0) {
      for (const prod of productos) {
        await addDetallePedidoProducto({
          id_pedido: newPedido.id_pedido, 
          id_producto: prod.id_producto,
          cantidad: prod.cantidad,
          precio_unitario: prod.precio_unitario,
          nombre_producto: prod.nombre_producto
        });
      }
    }

    res.status(201).json({
      pedido: newPedido,
      mensaje: "Pedido y detalles registrados correctamente"
    });
  } catch (error) {
    console.error("Error creando pedido con detalles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


export async function getDetallesController(req, res) {
  try {
    const { id_pedido } = req.params;
    const detalles = await getDetallesPedido(id_pedido);

    res.json(detalles);
  } catch (error) {
    console.error("Error obteniendo detalles de pedido:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Admin: todos los pedidos
export async function getPedidosAdminController(req, res) {
  try {
    const pedidos = await getAllPedidosService();
    res.json(pedidos);
  } catch (error) {
    console.error("Error obteniendo pedidos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Cliente: pedidos por usuario
export async function getPedidosUsuarioController(req, res) {
  try {
    const { id_usuario } = req.params;
    const pedidos = await getPedidosByUsuarioService(id_usuario);
    res.json(pedidos);
  } catch (error) {
    console.error("Error obteniendo pedidos de usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Pedido con sus detalles
export async function getPedidoDetallesController(req, res) {
  try {
    const { id_pedido } = req.params;
    const pedido = await getPedidoWithDetallesService(id_pedido);
    res.json(pedido);
  } catch (error) {
    console.error("Error obteniendo detalles de pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}