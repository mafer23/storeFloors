import * as pedidoModels from '../models/pedidoModels.js';

export async function createPedido({fecha_pedido,id_estado_pedido, id_usuario}) {
    const newPedido = {
        fecha_pedido,
        id_estado_pedido,
        id_usuario
    };
    return await pedidoModels.createPedido(newPedido);
}

export async function addDetallePedidoProducto(data) {
  return await pedidoModels.createDetallePedidoProducto(data);
}

export async function getDetallesPedido(id_pedido) {
  return await pedidoModels.getDetallesByPedido(id_pedido);
}


export async function getAllPedidosService() {
  return await pedidoModels.getAllPedidos();
}

export async function getPedidosByUsuarioService(id_usuario) {
  return await pedidoModels.getPedidosByUsuario(id_usuario);
}

export async function getPedidoWithDetallesService(id_pedido) {
  return await pedidoModels.getPedidoWithDetalles(id_pedido);
}