// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const saludMentalRoutes = require('./src/routes/saludMentalRoutes');
const javesaludRoutes = require('./src/routes/javesaludRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes');
const elevenlabsRoutes = require('./src/routes/elevenlabsRoutes');
const ollamaRoutes = require('./src/routes/ollamaRoutes');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

// Configuración de CORS
const corsOptions = {
  origin: '*', // Reemplaza con tu frontend en producción, ej. "https://tudominio.com"
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware CORS (incluye manejo de preflight)
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Aumentar el límite del cuerpo de las peticiones
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/saludMental', saludMentalRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/elevenlabs', elevenlabsRoutes);
app.use('/api/ollama', ollamaRoutes);
app.use('/api/javesalud', javesaludRoutes);

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌱 Environment: ${process.env.NODE_ENV}`);
});
