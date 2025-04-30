// backend/src/routes/callRoutes.js
const express = require('express');
const router = express.Router();
const {initiateCall, handleWebhook, getCallAnalysis} = require('../controllers/callController');

// Ruta para iniciar una llamada
router.post('/initiate', initiateCall);

// Ruta para recibir el webhook de Vapi
router.post('/webhook', handleWebhook);

// Ruta para obtener los análisis de llamadas
router.get('/analysis', getCallAnalysis);

module.exports = router;