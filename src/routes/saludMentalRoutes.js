// backend/src/routes/callRoutes.js
const express = require('express');
const router = express.Router();
const {onBoardingSaludMental, responseOnBoardingSaludMental, consultOnBoardingSaludMental} = require('../controllers/saludMentalController');

// Ruta para onBoarding Salud Mental
router.post('/onBoardingSaludMental', onBoardingSaludMental);
router.post('/responseOnBoardingSaludMental', responseOnBoardingSaludMental);
router.get('/consultOnBoardingSaludMental', consultOnBoardingSaludMental);

/* // Ruta para Entrevista Salud Mental
router.post('/entrevistaSaludMental', entrevistaSaludMental);
router.post('/responseentrevistaSaludMental', responseentrevistaSaludMental);

// Ruta para Seguimiento Salud Mental
router.post('/seguimientoSaludMental', seguimientoSaludMental);
router.post('/responseseguimientoSaludMental', responseseguimientoSaludMental); */

module.exports = router;