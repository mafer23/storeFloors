import pool from "../../db/connection.js"; 


export async function findRoleByType(tipo) {
  
  const [rows] = await pool.query("SELECT * FROM rol WHERE tipo = ? LIMIT 1", [tipo]);
  return rows[0];
}

export async function findRoleById(id_rol) {
  const [rows] = await pool.query(
    "SELECT tipo FROM rol WHERE id_rol = ? LIMIT 1",
    [id_rol]
  );

  if (rows.length === 0) {
    return null; 
  }
  return rows[0].tipo; 
}

export async function assignRoleToUser(id_usuario, id_rol) {
  await pool.query(
    "INSERT INTO rol_usuario (id_usuario, id_rol, fecha_asignacion) VALUES (?, ?, NOW())",
    [id_usuario, id_rol]
  );
}

export async function getRole(id_usuario) {
  const [row] = await pool.query("SELECT id_rol FROM rol_usuario WHERE id_usuario = ? LIMIT 1",[id_usuario]);
  return row[0];
}
