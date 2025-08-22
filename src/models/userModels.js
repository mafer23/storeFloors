import pool from "../../db/connection.js";  // 👈 agrega la extensión

// Buscar usuario por email
export async function findUserByEmail(email) {
  const [rows] = await pool.query(
    "SELECT * FROM usuario WHERE Email = ? LIMIT 1",
    [email]
  );
  return rows[0];
}

// Buscar usuario por ID
export async function findUserById(id) {
  const [rows] = await pool.query(
    `SELECT id_usuario, Name, Email, telefono, direccion, fecha_registro, activo 
     FROM usuario WHERE id_usuario = ?`,
    [id]
  );
  return rows[0];
}


// Crear usuario
export async function createUser({ Name, Email, Password, telefono, direccion }) {
  const [result] = await pool.query(
    `INSERT INTO usuario (Name, Email, Password, telefono, direccion, fecha_registro, activo) 
     VALUES (?, ?, ?, ?, ?, NOW(), 1)`,
    [Name, Email, Password, telefono, direccion]
  );

  return {
    id_usuario: result.insertId,
    Name,
    Email,
    telefono,
    direccion,
    activo: 1,
  };
}
