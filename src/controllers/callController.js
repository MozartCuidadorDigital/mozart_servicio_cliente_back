// backend/src/controllers/callController.js
const axios = require('axios');
const Call = require('../models/Call');

// IDs de agentes desde variables de entorno
const AGENT_IDS = {
    'servicios-publicos': process.env.VAPI_AGENT_SERVICIOS_PUBLICOS_ID,
    'caja-compensacion': process.env.VAPI_AGENT_CAJA_COMPENSACION_ID,
    'salud-mental': process.env.VAPI_AGENT_SALUD_MENTAL_ID, // Nuevo agente
};

// @desc    Iniciar una llamada a través de Vapi
// @route   POST /api/calls/initiate
// @access  Public
const initiateCall = async (req, res) => {
    const { phoneNumber, agentType } = req.body;

    // Validar si se recibió el número y el tipo de agente
    if (!phoneNumber || !agentType) {
        return res.status(400).json({ message: 'Faltan número de teléfono o tipo de agente' });
    }

    // Obtener el ID del agente según el tipo seleccionado
    const agentId = AGENT_IDS[agentType];
    if (!agentId) {
        return res.status(400).json({ message: 'Tipo de agente inválido' });
    }

    try {
        // Llamada a la API de Vapi para iniciar la llamada
        const vapiResponse = await axios.post(
            'https://api.vapi.ai/call/phone',
            {
                phoneNumber: phoneNumber, // El número ya debe venir con código de país
                agentId: agentId,
                // Puedes añadir más parámetros de Vapi aquí si es necesario
                // por ejemplo, si quieres enviar metadata inicial:
                // metadata: { userId: req.user.id }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Vapi responde con el ID de la llamada que inició
        res.status(200).json({
            message: 'Llamada iniciada',
            callId: vapiResponse.data.id,
            status: vapiResponse.data.status
        });

    } catch (error) {
        console.error('Error al iniciar la llamada con Vapi:', error.response?.data || error.message);
        res.status(500).json({
            message: 'Error al iniciar la llamada',
            error: error.response?.data || error.message
        });
    }
};

// @desc    Recibir Webhook de Vapi (cuando la llamada termina)
// @route   POST /api/calls/webhook
// @access  Public (Validado por secreto si se configura)
const handleWebhook = async (req, res) => {
    // Opcional pero recomendado: Validar el secreto del webhook si lo configuraste en Vapi
    // const webhookSecret = req.headers['x-vapi-secret'] || req.body.secret; // Vapi docs indica header o body
    // if (webhookSecret !== process.env.WEBHOOK_SECRET) {
    //    console.warn('Webhook con secreto inválido');
    //    return res.status(401).json({ message: 'Secreto inválido' });
    // }

    const vapiData = req.body;
    console.log('Webhook recibido de Vapi:', vapiData);

    // Vapi envía diferentes tipos de eventos. El análisis final suele estar en el evento 'call-ended'
    // La estructura exacta puede variar ligeramente, consulta la doc de Vapi.
    // Nos interesa el campo 'analysis' dentro del objeto 'call'.

    if (vapiData.status === 'ended' && vapiData.call && vapiData.call.analysis) {
         try {
            const callAnalysis = vapiData.call.analysis;

            // Guardar solo el análisis en la base de datos
            const newCall = new Call({
                analysis: callAnalysis,
                // vapiPayload: vapiData // Opcional: guarda el payload completo
            });

            await newCall.save();
            console.log('Análisis de llamada guardado en DB.');

            res.status(200).json({ message: 'Webhook recibido y análisis guardado' });

        } catch (error) {
            console.error('Error al procesar el webhook o guardar en DB:', error);
            res.status(500).json({ message: 'Error interno al procesar webhook' });
        }
    } else {
         // Si no es el evento 'call-ended' o no tiene el campo analysis,
         // simplemente reconocemos la recepción del webhook.
         console.log('Webhook recibido, pero no contiene análisis final para guardar.');
         res.status(200).json({ message: 'Webhook recibido, sin análisis final para guardar' });
    }
};

// @desc    Obtener todos los análisis de llamadas guardados
// @route   GET /api/calls/analysis
// @access  Public
const getCallAnalysis = async (req, res) => {
    try {
        // Encontrar todos los documentos en la colección 'calls'
        const calls = await Call.find({}).sort({ createdAt: -1 }); // Ordenar por fecha descendente

        // Extraer solo el campo 'analysis' de cada documento
        const analysisList = calls.map(call => ({
            id: call._id, // Opcional: incluir ID si lo necesitas en el frontend
            analysis: call.analysis,
            createdAt: call.createdAt
        }));

        res.status(200).json(analysisList);

    } catch (error) {
        console.error('Error al obtener análisis de llamadas:', error);
        res.status(500).json({ message: 'Error interno al obtener análisis' });
    }
};

module.exports = {
  initiateCall,
  handleWebhook,
  getCallAnalysis,
};