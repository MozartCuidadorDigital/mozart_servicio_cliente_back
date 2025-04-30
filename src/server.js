// backend/src/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const callRoutes = require('./routes/callRoutes');
const cors = require('cors'); // Importar cors

dotenv.config(); // Cargar variables de entorno
connectDB(); // Conectar a la base de datos

const app = express();

// Middleware para permitir CORS desde cualquier origen (puedes restringirlo a tu frontend en producción)
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// Montar las rutas de llamadas
app.use('/api/calls', callRoutes);

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});