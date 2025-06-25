const express = require('express');
const router = express.Router();
const { crearCliente, consultarPaciente, actualizarPaciente, obtenerHistorialClinico, guardarReporteClinico, obtenerHistorialReal } = require('../controllers/clienteController');

router.post('/', crearCliente);
router.post('/consultar', consultarPaciente);
router.post('/actualizar', actualizarPaciente);
router.post('/historial', obtenerHistorialClinico);
router.post('/reporte', guardarReporteClinico);
router.post('/historial-real', obtenerHistorialReal);

module.exports = router; 