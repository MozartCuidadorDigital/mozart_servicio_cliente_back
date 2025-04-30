// backend/src/server.js
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import saludMentalRoutes from './routes/saludMentalRoutes.js';
import dotenv from 'dotenv';

//const connectDB = require('./src/config/db');

dotenv.config(); // Cargar variables de entorno
//connectDB(); // Conectar a la base de datos

const app = express();

// Middleware para permitir CORS desde cualquier origen (puedes restringirlo a tu frontend en producción)
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(json());
app.use(urlencoded({ extended: true }));


// Montar las rutas de llamadas
app.use('/api/saludMental', saludMentalRoutes);

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});