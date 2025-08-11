import pool from '../../db/connection.js';

export async function getProducts() {
  const [rows] = await pool.query("SELECT * FROM producto");
  return rows;
}

export async function getProductById(id) {
  const [rows] = await pool.query("SELECT * FROM producto WHERE id_producto = ?", [id]);
  return rows[0];
}

export async function createProduct({ nombre_producto, descripcion, precio, stock, id_categoria, id_estado }) {
  const [result] = await pool.query(
    "INSERT INTO producto (nombre_producto, descripcion, precio, stock, id_categoria, id_estado) VALUES (?, ?, ?, ?, ?, ?)",
    [nombre_producto, descripcion, precio, stock, id_categoria, id_estado]
  );

  return {
    id_producto: result.insertId,
    nombre_producto,
    descripcion,
    precio,
    stock,
    id_categoria,
    id_estado
  };
}

export async function updateProduct(id, { nombre_producto, descripcion, precio, stock, id_categoria, id_estado }) {
  await pool.query(
    "UPDATE producto SET nombre_producto = ?, descripcion = ?, precio = ?, stock = ?, id_categoria = ?, id_estado = ? WHERE id_producto = ?",
    [nombre_producto, descripcion, precio, stock, id_categoria, id_estado, id]
  );

  return {
    id_producto: id,
    nombre_producto,
    descripcion,
    precio,
    stock,
    id_categoria,
    id_estado
  };
}

export async function deleteProduct(id) {
  await pool.query("DELETE FROM producto WHERE id_producto = ?", [id]);
  return { id_producto: id };
}