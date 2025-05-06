// backend/src/routes/callRoutes.js
const express = require('express');
const router = express.Router();
const {onBoardingSaludMental, responseOnBoardingSaludMental, consultOnBoardingSaludMental} = require('../controllers/saludMentalController');
const {entrevistaSaludMental, responseEntrevistaSaludMental, consultEntrevistaSaludMental} = require('../controllers/saludMentalController');
const {seguimientoSaludMental, responseSeguimientoSaludMental, consultSeguimientoSaludMental} = require('../controllers/saludMentalController');
const {whatsappBienvenida, whatsappMedicamento, whatsappCitaMedica} = require('../controllers/saludMentalController');


// Ruta para onBoarding Salud Mental
router.post('/onBoardingSaludMental', onBoardingSaludMental);
router.post('/responseOnBoardingSaludMental', responseOnBoardingSaludMental);
router.get('/consultOnBoardingSaludMental', consultOnBoardingSaludMental);

// Ruta para Entrevista Salud Mental
router.post('/entrevistaSaludMental', entrevistaSaludMental);
router.post('/responseEntrevistaSaludMental', responseEntrevistaSaludMental);
router.get('/consultEntrevistaSaludMental', consultEntrevistaSaludMental);

// Ruta para Seguimiento Salud Mental
router.post('/seguimientoSaludMental', seguimientoSaludMental);
router.post('/responseseguimientoSaludMental', responseSeguimientoSaludMental);
router.get('/consultSeguimientoSaludMental', consultSeguimientoSaludMental);

// Ruta para WhatsApp
router.post('/whatsappBienvenida', whatsappBienvenida);
router.post('/whatsappMedicamento', whatsappMedicamento);
router.post('/whatsappCitaMedica', whatsappCitaMedica);

module.exports = router;