// backend/src/routes/javesaludRoutes.js
const express = require('express');
const router = express.Router();
const {iniciarLlamadaCitologia, iniciarLlamadaVph, analizarEdadYLlamar,enviarWhatsApp} = require('../controllers/javesaludController');
const {whatsappBienvenida, whatsappMedicamento, whatsappCita} = require('../controllers/saludMentalController');
const controller = require('../controllers/javesaludController');

// Ruta para Llamadas de Tamizaje
router.post('/iniciarLlamadaCitologia', iniciarLlamadaCitologia);
router.post('/iniciarLlamadaVph', iniciarLlamadaVph);

router.post('/llamada', analizarEdadYLlamar);
// Rutas para WhatsApp
router.post('/whatsapp', enviarWhatsApp);




module.exports = router;