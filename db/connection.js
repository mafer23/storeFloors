import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'storekaren',
  waitForConnections: true,
  connectionLimit: 10,   // Máx. conexiones abiertas
  queueLimit: 0
});


export default pool;

