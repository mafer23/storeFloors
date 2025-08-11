import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connection from './db/connection.js';

import productsRoutes from './src/routes/productRoutes.js';
import cors from 'cors';

// Inicializa la aplicación
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // <-- Agrega esta línea

app.use(cors());
app.use("/products", productsRoutes);


// Ruta principal
app.get('/', async (req, res) => {
  try {
    // Prueba una consulta simple
    const [rows] = await connection.query('SELECT 1');
    res.send('Conexión exitosa a la base de datos!');
  } catch (error) {
    res.status(500).send('Error de conexión a la base de datos');
  }
});


app.get("/api/data", (req, res) => {
  res.json({ msg: "Hola desde el servidor" });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
