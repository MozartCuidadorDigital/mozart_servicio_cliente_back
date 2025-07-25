// backend/src/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const saludMentalRoutes = require('./src/routes/saludMentalRoutes');
const javesaludRoutes = require('./src/routes/javesaludRoutes'); // Importar las rutas de JaveSalud
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar cors
const clienteRoutes = require('./src/routes/clienteRoutes');
const elevenlabsRoutes = require('./src/routes/elevenlabsRoutes');
const ollamaRoutes = require('./src/routes/ollamaRoutes');
const app = express();

dotenv.config(); // Cargar variables de entorno
connectDB(); // Conectar a la base de datos


// Aumentar el límite del tamaño del cuerpo
app.use(bodyParser.json({ limit: '50mb' })); // Ajusta el límite según sea necesario
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware para permitir CORS desde cualquier origen (puedes restringirlo a tu frontend en producción)
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// Montar las rutas de llamadas
app.use('/api/saludMental', saludMentalRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/elevenlabs', elevenlabsRoutes);
app.use('/api/ollama', ollamaRoutes);
app.use('/api/javesalud', javesaludRoutes); // Ruta para JaveSalud

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
