const Cliente = require('../models/cliente');
const ReporteClinico = require('../models/reporteClinico');

exports.crearCliente = async (req, res) => {
  try {
    const { nombre, identificacion, correo } = req.body;
    if (!nombre || !identificacion || !correo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    const nuevoCliente = new Cliente({ nombre, identificacion, correo });
    await nuevoCliente.save();
    res.status(201).json({ message: 'Cliente creado exitosamente', cliente: nuevoCliente });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'El cliente ya existe.' });
    }
    res.status(500).json({ error: 'Error al crear el cliente.' });
  }
};

// 1. Consultar el estado del paciente por documento
exports.consultarPaciente = async (req, res) => {
  try {
    const { documento } = req.body;
    if (!documento) {
      return res.status(400).json({ error: 'El número de documento es obligatorio.' });
    }
    const paciente = await Cliente.findOne({ identificacion: documento });
    if (!paciente) {
      return res.json({ estado: 'nuevo' });
    }
    if (!paciente.nombre || !paciente.fecha_nacimiento) {
      return res.json({ estado: 'incompleto', paciente });
    }
    return res.json({ estado: 'registrado', paciente });
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar el paciente.' });
  }
};

// 2. Actualizar datos faltantes del paciente
exports.actualizarPaciente = async (req, res) => {
  try {
    const { documento, nombre, fecha_nacimiento, correo } = req.body;
    if (!documento) {
      return res.status(400).json({ error: 'El número de documento es obligatorio.' });
    }
    let paciente = await Cliente.findOne({ identificacion: documento });
    if (!paciente) {
      paciente = new Cliente({ identificacion: documento, nombre, fecha_nacimiento, correo });
    } else {
      if (nombre) paciente.nombre = nombre;
      if (fecha_nacimiento) paciente.fecha_nacimiento = fecha_nacimiento;
      if (correo) paciente.correo = correo;
    }
    await paciente.save();
    res.json({ message: 'Datos actualizados', paciente });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el paciente.' });
  }
};

// 3. Obtener historial clínico simulado
exports.obtenerHistorialClinico = async (req, res) => {
  try {
    const { documento } = req.body;
    if (!documento) {
      return res.status(400).json({ error: 'El número de documento es obligatorio.' });
    }
    const paciente = await Cliente.findOne({ identificacion: documento });
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado.' });
    }
    // Simulación de historial clínico
    const historial = [
      { fecha: '2024-06-01', condicion: 'dolor de rodilla', notas: 'En tratamiento.' },
      { fecha: '2024-05-10', condicion: 'gripe', notas: 'Recuperado.' }
    ];
    res.json({ nombre: paciente.nombre, ultima_condicion: historial[0].condicion, historial });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial clínico.' });
  }
};

// Guardar un nuevo reporte clínico
exports.guardarReporteClinico = async (req, res) => {
  try {
    const { documento, sintomas, diagnostico, recomendacion } = req.body;
    const paciente = await Cliente.findOne({ identificacion: documento });
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado.' });
    }
    const nuevoReporte = new ReporteClinico({
      paciente: paciente._id,
      sintomas,
      diagnostico,
      recomendacion
    });
    await nuevoReporte.save();
    res.status(201).json({ message: 'Reporte clínico guardado', reporte: nuevoReporte });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el reporte clínico.' });
  }
};

// Consultar historial clínico real del paciente
exports.obtenerHistorialReal = async (req, res) => {
  try {
    const { documento } = req.body;
    const paciente = await Cliente.findOne({ identificacion: documento });
    if (!paciente) {
      return res.status(404).json({ error: 'Paciente no encontrado.' });
    }
    const reportes = await ReporteClinico.find({ paciente: paciente._id }).sort({ fecha: -1 });
    res.json({ reportes });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial clínico.' });
  }
};








