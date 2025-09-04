import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connection from './db/connection.js';

import productsRoutes from './src/routes/productRoutes.js';
import pedidoRoutes from "./src/routes/pedidoRoutes.js";
import authRoutes from './src/routes/authRoutes.js';
import secureRoutes from './src/routes/secureRoutes.js';  // 👈 nuevo router
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Rutas
app.use("/products", productsRoutes);
app.use("/auth", authRoutes);
app.use("/secure", secureRoutes);  // 👈 todas las rutas seguras aquí
app.use("/pedidos", pedidoRoutes); 
// Ruta principal
app.get('/', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT 1');
    res.send('Conexión exitosa a la base de datos!');
  } catch (error) {
    res.status(500).send('Error de conexión a la base de datos');
  }
});

app.get("/api/data", (req, res) => {
  res.json({ msg: "Hola desde el servidor" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
