const axios = require('axios');
const onBoardingSaludMental = require('../models/onBoardingSaludMental'); // Importar el modelo específico
const entrevistaSaludMental = require('../models/entrevistaSaludMental'); // Importar el modelo


exports.onBoardingSaludMental = async (req, res) => {
    try {
        const { numero } = req.body;

        axios.post(
            "https://api.vapi.ai/call/phone",
            {
                assistantId: "f94386b6-9218-4386-9a54-5ccad8e0c1ea",
                customer: { number: numero },
                phoneNumberId: "7589b5b5-f1f3-42e6-b287-7da895d6a540"
            },
            {
                headers: {
                    Authorization: "Bearer d9424df4-37c9-4186-9b97-4c81be169786",
                    "Content-Type": "application/json"
                }
            }
        ).then(response => {
            console.log("✅ Llamada iniciada correctamente:", response.data);
            res.status(200).json({ message: "Llamada en proceso, el usuario será contactado." });

        }).catch(error => {
            console.error("❌ Error al iniciar la llamada:", error.response?.data || error.message);
        });

    } catch (error) {
        console.error("❌ Error en onBoardingSaludMental:", error.message);
        res.status(500).json({ error: "Error al procesar la solicitud de llamada" });
    }
};

exports.entrevistaSaludMental = async (req, res) => {
  try {
      const { numero } = req.body;

      axios.post(
          "https://api.vapi.ai/call/phone",
          {
              assistantId: "f9f621a1-9fbe-4a94-ae60-b5699a8fa34e",
              customer: { number: numero },
              phoneNumberId: "7589b5b5-f1f3-42e6-b287-7da895d6a540"
          },
          {
              headers: {
                  Authorization: "Bearer d9424df4-37c9-4186-9b97-4c81be169786",
                  "Content-Type": "application/json"
              }
          }
      ).then(response => {
          console.log("✅ Llamada iniciada correctamente:", response.data);
          res.status(200).json({ message: "Llamada en proceso, el usuario será contactado." });

      }).catch(error => {
          console.error("❌ Error al iniciar la llamada:", error.response?.data || error.message);
      });

  } catch (error) {
      console.error("❌ Error en entrevistaSaludMental:", error.message);
      res.status(500).json({ error: "Error al procesar la solicitud de llamada" });
  }
};

exports.seguimientoSaludMental = async (req, res) => {
  try {
      const { numero } = req.body;

      axios.post(
          "https://api.vapi.ai/call/phone",
          {
              assistantId: "ff5d602ec-c5a7-4168-a19d-18fd10a8ee52",
              customer: { number: numero },
              phoneNumberId: "7589b5b5-f1f3-42e6-b287-7da895d6a540"
          },
          {
              headers: {
                  Authorization: "Bearer d9424df4-37c9-4186-9b97-4c81be169786",
                  "Content-Type": "application/json"
              }
          }
      ).then(response => {
          console.log("✅ Llamada iniciada correctamente:", response.data);
          res.status(200).json({ message: "Llamada en proceso, el usuario será contactado." });

      }).catch(error => {
          console.error("❌ Error al iniciar la llamada:", error.response?.data || error.message);
      });

  } catch (error) {
      console.error("❌ Error en seguimientoSaludMental:", error.message);
      res.status(500).json({ error: "Error al procesar la solicitud de llamada" });
  }
};


exports.responseOnBoardingSaludMental = async (req, res) => {
  try {
    const { message } = req.body;

    if (message?.type === 'end-of-call-report' && message?.analysis?.structuredData) {
      const structuredData = message.analysis.structuredData;
      console.log("📋 structuredData recibido:", JSON.stringify(structuredData, null, 2));
      console.log("📋 Datos recibidos en /api/responseOnBoardingSaludMental:", structuredData);

      // Crear un nuevo documento en la colección de MongoDB específica para onboarding
      const newCall = new onBoardingSaludMental({
        NombreCompleto: structuredData.NombreCompleto,
        Telefono: structuredData.Telefono,
        DocumentoIdentidad: {
          Tipo: structuredData.DocumentoIdentidad.Tipo,
          Numero: structuredData.DocumentoIdentidad.Numero,
        },
        FechaEntrevista: structuredData.FechaEntrevista,
      });

      // Guardar en la base de datos
      await newCall.save();

      console.log("✅ Datos guardados correctamente en la colección OnBoardingSaludMental");
      res.status(200).json({ message: "Datos procesados y guardados correctamente en MongoDB" });
    } else {
      console.log("⚠️ No se encontró structuredData en el mensaje recibido.");
      res.status(400).json({ error: "No se encontró structuredData en el mensaje recibido." });
    }
  } catch (error) {
    console.error("❌ Error en responseOnBoardingSaludMental:", error.message);
    res.status(500).json({ error: "Error al procesar los datos" });
  }
};

exports.responseEntrevistaSaludMental = async (req, res) => {
  try {
    const { message } = req.body;

    console.log("📥 JSON recibido:", JSON.stringify(req.body, null, 2)); // Log detallado del JSON recibido

    if (message?.type === 'end-of-call-report' && message?.analysis?.structuredData) {
      const structuredData = message.analysis.structuredData;
      console.log("📋 structuredData recibido:", JSON.stringify(structuredData, null, 2));
      console.log("📋 Datos procesados en /api/responseEntrevistaSaludMental:", structuredData);

      // Crear un nuevo documento en la colección de MongoDB específica para entrevista
      const newEntry = new entrevistaSaludMental({
        TamizajeInicial: {
          CriteriosInclusion: {
            PreguntasRespuestas: {
              edad_18_60: structuredData.CriteriosInclusion?.PreguntasRespuestas?.edad_18_60 || false,
              reside_bogota_urbano: structuredData.CriteriosInclusion?.PreguntasRespuestas?.reside_bogota_urbano || false,
              conectividad_internet: structuredData.CriteriosInclusion?.PreguntasRespuestas?.conectividad_internet || false,
              sintomas_atenuados_post_hosp: structuredData.CriteriosInclusion?.PreguntasRespuestas?.sintomas_atenuados_post_hosp || false,
              red_apoyo_funcional: structuredData.CriteriosInclusion?.PreguntasRespuestas?.red_apoyo_funcional || false,
              cuidador_mismo_domicilio: structuredData.CriteriosInclusion?.PreguntasRespuestas?.cuidador_mismo_domicilio || false,
              perdida_capacidades_impide_metas: structuredData.CriteriosInclusion?.PreguntasRespuestas?.perdida_capacidades_impide_metas || false,
              consumo_sustancias_problema: structuredData.CriteriosInclusion?.PreguntasRespuestas?.consumo_sustancias_problema || false,
              adherencia_previa_tratamiento: structuredData.CriteriosInclusion?.PreguntasRespuestas?.adherencia_previa_tratamiento || false,
            },
            VeredictoElegibilidad: structuredData.CriteriosInclusion?.VeredictoElegibilidad || "No especificado",
            JustificacionElegibilidad: structuredData.CriteriosInclusion?.JustificacionElegibilidad || "No especificado",
            RecomendacionesElegibilidad: structuredData.CriteriosInclusion?.RecomendacionesElegibilidad || "No especificado",
          },
          EvaluacionFuncionamientoGlobal: {
            DificultadesRelacionarseUltimoAnio: structuredData.EvaluacionFuncionamientoGlobal?.DificultadesRelacionarseUltimoAnio || "No especificado",
            MantenidoActividadesEstructuradas: structuredData.EvaluacionFuncionamientoGlobal?.MantenidoActividadesEstructuradas || "No especificado",
            EpisodiosCriticosRecientes: structuredData.EvaluacionFuncionamientoGlobal?.EpisodiosCriticosRecientes || "No especificado",
            NivelEnergiaMotivacion: structuredData.EvaluacionFuncionamientoGlobal?.NivelEnergiaMotivacion || "No especificado",
            ConductasRiesgo: structuredData.EvaluacionFuncionamientoGlobal?.ConductasRiesgo || "No especificado",
            ParticipacionSocialComunitaria: structuredData.EvaluacionFuncionamientoGlobal?.ParticipacionSocialComunitaria || "No especificado",
            ComentariosAdicionalesEvaluador: structuredData.EvaluacionFuncionamientoGlobal?.ComentariosAdicionalesEvaluador || "No especificado",
          },
        },
      });

      // Guardar en la base de datos
      await newEntry.save();

      console.log("✅ Datos guardados correctamente en la colección EntrevistaSaludMental");
      res.status(200).json({ message: "Datos procesados y guardados correctamente en MongoDB" });
    } else {
      console.log("⚠️ No se encontró structuredData en el mensaje recibido.");
      res.status(400).json({ error: "No se encontró structuredData en el mensaje recibido." });
    }
  } catch (error) {
    console.error("❌ Error en responseEntrevistaSaludMental:", error.message);
    res.status(500).json({ error: "Error al procesar los datos" });
  }
};

exports.consultOnBoardingSaludMental = async (req, res) => {
  try {
    // Consultar todas las llamadas de la colección onBoardingSaludMental
    const calls = await onBoardingSaludMental.find();

    res.status(200).json(calls);
  } catch (error) {
    console.error("❌ Error en consultOnBoardingSaludMental:", error.message);
    res.status(500).json({ error: "Error al consultar las llamadas de onBoardingSaludMental" });
  }
};

exports.consultEntrevistaSaludMental = async (req, res) => {
  try {
    // Consultar todas las entradas de la colección EntrevistaSaludMental
    const entries = await entrevistaSaludMental.find();

    res.status(200).json(entries);
  } catch (error) {
    console.error("❌ Error en consultEntrevistaSaludMental:", error.message);
    res.status(500).json({ error: "Error al consultar las entradas de EntrevistaSaludMental" });
  }
};