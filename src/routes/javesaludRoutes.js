// backend/src/routes/callRoutes.js
const express = require('express');
const router = express.Router();
const {iniciarLlamadaCitologia, iniciarLlamadaVph, consultiniciarLlamadaCitologia} = require('../controllers/javesaludController');
const {whatsappBienvenida, whatsappMedicamento, whatsappCita} = require('../controllers/saludMentalController');
const controller = require('../controllers/javesaludController');

// Ruta para Llamadas de Tamizaje
router.post('/iniciarLlamadaCitologia', iniciarLlamadaCitologia);
router.post('/iniciarLlamadaVph', iniciarLlamadaVph);

router.post('/api/llamada', controller.analizarEdadYLlamar);
// Rutas para WhatsApp
router.post('/api/whatsapp', controller.enviarWhatsApp);




module.exports = router;