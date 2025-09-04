import pool from "../../db/connection.js"; 


export async function createPedido({fecha_pedido,id_estado_pedido, id_usuario}) {
    const [result] = await pool.query(
        "INSERT INTO storekaren.pedido(id_pedido, fecha_pedido, id_estado_pedido, id_usuario) VALUES(?, NOW(), ?, ?);",
        [fecha_pedido,id_estado_pedido,id_usuario]
    );

    return {
        id_pedido:result.insertId,
        fecha_pedido,
        id_estado_pedido,
        id_usuario
    }
}

export async function createDetallePedidoProducto({ id_pedido, id_producto, cantidad, precio_unitario, nombre_producto }) {
  const [result] = await pool.query(
    `INSERT INTO storekaren.detalle_pedido_producto 
      (id_pedido, id_producto, cantidad, precio_unitario, nombre_producto) 
     VALUES (?, ?, ?, ?, ?)`,
    [id_pedido, id_producto, cantidad, precio_unitario, nombre_producto]
  );

  return {
    id_detail_product: result.insertId,
    id_pedido,
    id_producto,
    cantidad,
    precio_unitario,
    nombre_producto
  };
}

export async function getDetallesByPedido(id_pedido) {
  const [rows] = await pool.query(
    "SELECT * FROM storekaren.detalle_pedido_producto WHERE id_pedido = ?",
    [id_pedido]
  );
  return rows;
}

// Traer todos los pedidos (modo admin)
export async function getAllPedidos() {
  const [rows] = await pool.query(
    ` SELECT p.id_pedido, p.fecha_pedido, p.id_usuario, e.name
    FROM pedido p
    JOIN estado_pedido e ON p.id_estado_pedido = e.id_estado
    ORDER BY p.fecha_pedido DESC`
  );
  return rows;
}

// Traer pedidos de un usuario específico
export async function getPedidosByUsuario(id_usuario) {
  const [rows] = await pool.query(
    `SELECT p.id_pedido, p.fecha_pedido, e.name
     FROM pedido p
     JOIN estado_pedido e ON p.id_estado_pedido = e.id_estado
     WHERE p.id_usuario = ?
     ORDER BY p.fecha_pedido DESC`,
    [id_usuario]
  );
  return rows;
}

// Traer un pedido con sus detalles
export async function getPedidoWithDetalles(id_pedido) {
  const [rows] = await pool.query(
    `SELECT p.id_pedido, p.fecha_pedido, e.name,
            d.id_producto, d.nombre_producto, d.cantidad, d.precio_unitario
     FROM pedido p
     JOIN estado_pedido e ON p.id_estado_pedido = e.id_estado
     JOIN detalle_pedido_producto d ON p.id_pedido = d.id_pedido
     WHERE p.id_pedido = ?`,
    [id_pedido]
  );
  return rows;
}