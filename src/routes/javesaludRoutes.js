// backend/src/routes/callRoutes.js
const express = require('express');
const router = express.Router();
const {iniciarLlamadaCitologia, iniciarLlamadaVph, consultiniciarLlamadaCitologia} = require('../controllers/javesaludController');
const {whatsappBienvenida, whatsappMedicamento, whatsappCita} = require('../controllers/saludMentalController');

// Ruta para Llamadas de Tamizaje
router.post('/iniciarLlamadaCitologia', iniciarLlamadaCitologia);
router.post('/iniciarLlamadaVph', iniciarLlamadaVph);


// Rutas para WhatsApp
router.post('/whatsappBienvenida', whatsappBienvenida);
router.post('/whatsappMedicamento', whatsappMedicamento);
router.post('/whatsappCita', whatsappCita);



module.exports = router;