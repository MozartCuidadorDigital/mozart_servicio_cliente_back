const Cliente = require('../models/cliente');
const ReporteClinico = require('../models/reporteClinico');

// 1. Crear paciente
async function crearPaciente(parametros) {
  const { documento, nombre, fecha_nacimiento, correo } = parametros;
  if (!documento || !nombre || !fecha_nacimiento || !correo) {
    return { error: 'Todos los campos son obligatorios.' };
  }
  try {
    const nuevoPaciente = new Cliente({ identificacion: documento, nombre, fecha_nacimiento, correo });
    await nuevoPaciente.save();
    return { message: 'Paciente creado exitosamente', paciente: nuevoPaciente };
  } catch (error) {
    if (error.code === 11000) {
      return { error: 'El paciente ya existe.' };
    }
    return { error: 'Error al crear el paciente.' };
  }
}

// 2. Consultar paciente
async function consultarPaciente(parametros) {
  const { documento } = parametros;
  if (!documento) {
    return { error: 'El número de documento es obligatorio.' };
  }
  const paciente = await Cliente.findOne({ identificacion: documento });
  if (!paciente) {
    return { estado: 'nuevo' };
  }
  if (!paciente.nombre || !paciente.fecha_nacimiento) {
    return { estado: 'incompleto', paciente };
  }
  return { estado: 'registrado', paciente };
}

// 3. Actualizar paciente
async function actualizarPaciente(parametros) {
  const { documento, nombre, fecha_nacimiento, correo } = parametros;
  if (!documento) {
    return { error: 'El número de documento es obligatorio.' };
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
  return { message: 'Datos actualizados', paciente };
}

// 4. Obtener historial clínico simulado
async function obtenerHistorialClinico(parametros) {
  const { documento } = parametros;
  if (!documento) {
    return { error: 'El número de documento es obligatorio.' };
  }
  const paciente = await Cliente.findOne({ identificacion: documento });
  if (!paciente) {
    return { error: 'Paciente no encontrado.' };
  }
  // Simulación de historial clínico
  const historial = [
    { fecha: '2024-06-01', condicion: 'dolor de rodilla', notas: 'En tratamiento.' },
    { fecha: '2024-05-10', condicion: 'gripe', notas: 'Recuperado.' }
  ];
  return { nombre: paciente.nombre, ultima_condicion: historial[0].condicion, historial };
}

// 5. Guardar reporte clínico
async function guardarReporteClinico(parametros) {
  const { documento, sintomas, diagnostico, recomendacion } = parametros;
  const paciente = await Cliente.findOne({ identificacion: documento });
  if (!paciente) {
    return { error: 'Paciente no encontrado.' };
  }
  const nuevoReporte = new ReporteClinico({
    paciente: paciente._id,
    sintomas,
    diagnostico,
    recomendacion
  });
  await nuevoReporte.save();
  return { message: 'Reporte clínico guardado', reporte: nuevoReporte };
}

// 6. Obtener historial clínico real
async function obtenerHistorialReal(parametros) {
  const { documento } = parametros;
  const paciente = await Cliente.findOne({ identificacion: documento });
  if (!paciente) {
    return { error: 'Paciente no encontrado.' };
  }
  const reportes = await ReporteClinico.find({ paciente: paciente._id }).sort({ fecha: -1 });
  return { reportes };
}

// Handler principal
exports.handler = async (req, res) => {
  const { accion, parametros } = req.body;
  try {
    let resultado;
    switch (accion) {
      case 'crear_paciente':
        resultado = await crearPaciente(parametros);
        break;
      case 'consultar_paciente':
        resultado = await consultarPaciente(parametros);
        break;
      case 'actualizar_paciente':
        resultado = await actualizarPaciente(parametros);
        break;
      case 'obtener_historial_clinico':
        resultado = await obtenerHistorialClinico(parametros);
        break;
      case 'guardar_reporte_clinico':
        resultado = await guardarReporteClinico(parametros);
        break;
      case 'obtener_historial_real':
        resultado = await obtenerHistorialReal(parametros);
        break;
      default:
        return res.status(400).json({ error: 'Acción no reconocida' });
    }
    return res.json(resultado);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}; 