const axios = require('axios');
const onBoardingSaludMental = require('../models/onBoardingSaludMental'); // Importar el modelo específico
const entrevistaSaludMental = require('../models/entrevistaSaludMental'); // Importar el modelo
const seguimientoSaludMental = require('../models/seguimientoSaludMental'); // Importar el modelo
const { OpenAI } = require("openai");


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
              assistantId: "f5d602ec-c5a7-4168-a19d-18fd10a8ee52",
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

exports.oxiOnBoarding = async (req, res) => {
  try {
      const { numero } = req.body;

      axios.post(
          "https://api.vapi.ai/call/phone",
          {
              assistantId: "c7859f93-824e-4e4b-9e64-ad97426df0e2", // Reemplaza por el ID real
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
          console.log("✅ Llamada Oxi OnBoarding iniciada correctamente:", response.data);
          res.status(200).json({ message: "Llamada Oxi OnBoarding en proceso, el usuario será contactado." });

      }).catch(error => {
          console.error("❌ Error al iniciar la llamada Oxi OnBoarding:", error.response?.data || error.message);
          res.status(500).json({ error: "Error al iniciar la llamada Oxi OnBoarding" });
      });

  } catch (error) {
      console.error("❌ Error en oxiOnBoarding:", error.message);
      res.status(500).json({ error: "Error al procesar la solicitud de llamada Oxi OnBoarding" });
  }
};

exports.oxiTamizaje = async (req, res) => {
  try {
      const { numero } = req.body;

      axios.post(
          "https://api.vapi.ai/call/phone",
          {
              assistantId: "dc56652e-79da-4a92-a6f6-9d666344190f", // Reemplaza por el ID real
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
          console.log("✅ Llamada Oxi Tamizaje iniciada correctamente:", response.data);
          res.status(200).json({ message: "Llamada Oxi Tamizaje en proceso, el usuario será contactado." });

      }).catch(error => {
          console.error("❌ Error al iniciar la llamada Oxi Tamizaje:", error.response?.data || error.message);
          res.status(500).json({ error: "Error al iniciar la llamada Oxi Tamizaje" });
      });

  } catch (error) {
      console.error("❌ Error en oxiTamizaje:", error.message);
      res.status(500).json({ error: "Error al procesar la solicitud de llamada Oxi Tamizaje" });
  }
};


exports.responseOnBoardingSaludMental = async (req, res) => {
  try {
    const { message } = req.body;

    if (message?.type === 'end-of-call-report' && message?.analysis?.structuredData) {
      const structuredData = message.analysis.structuredData;
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

    if (message?.type === 'end-of-call-report' && message?.analysis?.structuredData) {
      const structuredData = message.analysis.structuredData;
      console.log("📋 Datos recibidos en /api/responseEntrevistaSaludMental:", structuredData);

      // Crear un nuevo documento en la colección de MongoDB
      const newEntry = new entrevistaSaludMental({
        TamizajeInicial: structuredData.TamizajeInicial // Usar directamente la estructura completa
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

exports.responseSeguimientoSaludMental = async (req, res) => {
  try {
    const { message } = req.body;

    if (message?.type === 'end-of-call-report' && message?.analysis?.structuredData) {
      const structuredData = message.analysis.structuredData;
      console.log("📋 Datos recibidos en /api/responseSeguimientoSaludMental:", structuredData);

      // Crear un nuevo documento en la colección de MongoDB
      const newEntry = new seguimientoSaludMental({
        atencionUrgenciaSummary: structuredData.atencionUrgenciaSummary,
      });

      // Guardar en la base de datos
      await newEntry.save();

      console.log("✅ Datos guardados correctamente en la colección SeguimientoSaludMental");
      res.status(200).json({ message: "Datos procesados y guardados correctamente en MongoDB" });
    } else {
      console.log("⚠️ No se encontró structuredData en el mensaje recibido.");
      res.status(400).json({ error: "No se encontró structuredData en el mensaje recibido." });
    }
  } catch (error) {
    console.error("❌ Error en responseSeguimientoSaludMental:", error.message);
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

exports.consultSeguimientoSaludMental = async (req, res) => {
  try {
    // Consultar todas las entradas de la colección SeguimientoSaludMental
    const entries = await seguimientoSaludMental.find();

    res.status(200).json(entries);
  } catch (error) {
    console.error("❌ Error en consultSeguimientoSaludMental:", error.message);
    res.status(500).json({ error: "Error al consultar las entradas de SeguimientoSaludMental" });
  }
};


exports.whatsappBienvenida = async (req, res) => {
  try {
    const { numero } = req.body;
    
    axios.post(
      "https://graph.facebook.com/v22.0/587113451151885/messages",
      {
        messaging_product: "whatsapp",
        to: numero,
        type: "template",
        template: {
          name: "notificacion_nuevo_paciente_new",
          language: {
            code: "en"
          },
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: "image",
                  image: {
                    link: "https://adresfosyga.co/wp-content/uploads/2020/05/Nueva-EPS-Logo.png"
                  }
                }
              ]
            },
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: "https://mozart-nuevo-fronted.vercel.app/"
                },
                {
                  type: "text",
                  text: "pacientenuevaeps"
                },
                {
                  type: "text",
                  text: "12345"
                }
              ]
            }
          ]
        }
      },
      {
        headers: {
          Authorization: "Bearer EAAaTwNpMCk0BOZCdHI0f18pn7lTw8DQ8G68cHEdeKr29pW92bZA4SpQJ7AYhTt9j9kzSAU6Ld67rJqFoR7zt0bRgfdZCFDXhjRXp2UZCG2dwToSrTR9uU4FOZCrTVuAeTwsTZCmIfxvOGZARyoR8ajqn8X7ZCCXa7awgBDiauyZARx2nHCqlIIQa8udZB6aR76Of4H7wZDZD",
          "Content-Type": "application/json"
        }
      }
    ).then(response => {
      console.log("✅ Mensaje WhatsApp enviado correctamente:", response.data);
      res.status(200).json({ message: "Mensaje de WhatsApp enviado correctamente." });
    }).catch(error => {
      console.error("❌ Error al enviar mensaje de WhatsApp:", error.response?.data || error.message);
      res.status(500).json({ error: "Error al enviar mensaje de WhatsApp" });
    });
  } catch (error) {
    console.error("❌ Error en whatsappBienvenida:", error.message);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};

// Función para enviar mensaje de WhatsApp para medicamento
exports.whatsappMedicamento = async (req, res) => {
  try {
    const { numero } = req.body;
    
    const datosQuemados = {
      nombrePaciente: "Paciente 1",
      medicamento: "Clonazepam",
      concentracion: "2mg",
      horaTomaFormateada: "8:00 AM",
      dosis: "1 tableta",
      presentacion: "Tabletas",
      viaAdministracion: "Oral",
      indicaciones: "Tomar con agua"
    };

    axios.post(
      "https://graph.facebook.com/v22.0/587113451151885/messages",
      {
        messaging_product: "whatsapp",
        to: numero,
        type: "template",
        template: {
          name: "nuevo_medicamento_new",
          language: {
            code: "en"
          },
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: "image",
                  image: {
                    link: "https://adresfosyga.co/wp-content/uploads/2020/05/Nueva-EPS-Logo.png"
                  }
                }
              ]
            },
            {
              type: "body",
              parameters: Object.entries(datosQuemados).map(([_, value]) => ({
                type: "text",
                text: value
              }))
            }
          ]
        }
      },
      {
        headers: {
          Authorization: "Bearer EAAaTwNpMCk0BOZCdHI0f18pn7lTw8DQ8G68cHEdeKr29pW92bZA4SpQJ7AYhTt9j9kzSAU6Ld67rJqFoR7zt0bRgfdZCFDXhjRXp2UZCG2dwToSrTR9uU4FOZCrTVuAeTwsTZCmIfxvOGZARyoR8ajqn8X7ZCCXa7awgBDiauyZARx2nHCqlIIQa8udZB6aR76Of4H7wZDZD",
          "Content-Type": "application/json"
        }
      }
    ).then(response => {
      console.log("✅ Mensaje WhatsApp enviado correctamente:", response.data);
      res.status(200).json({ message: "Mensaje de WhatsApp enviado correctamente." });
    }).catch(error => {
      console.error("❌ Error al enviar mensaje de WhatsApp:", error.response?.data || error.message);
      res.status(500).json({ error: "Error al enviar mensaje de WhatsApp" });
    });
  } catch (error) {
    console.error("❌ Error en whatsappMedicamento:", error.message);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};


exports.whatsappCita = async (req, res) => {
  try {
    const { numero } = req.body;
    
    const datosQuemados = {
      Paciente: "Paciente 1",
      fechaCitaFormateada: "9 de Mayo de 2025",
      horaCitaFormateada: "10:30 AM",
      hospital: "Hospital Central"
    };

    axios.post(
      "https://graph.facebook.com/v22.0/587113451151885/messages",
      {
        messaging_product: "whatsapp",
        to: numero,
        type: "template",
        template: {
          name: "notificacion_cita_mozart",
          language: {
            code: "en"
          },
          components: [
            {
              type: "header",
              parameters: [
                {
                  type: "image",
                  image: {
                    link: "https://adresfosyga.co/wp-content/uploads/2020/05/Nueva-EPS-Logo.png"
                  }
                }
              ]
            },
            {
              type: "body",
              parameters: Object.entries(datosQuemados).map(([_, value]) => ({
                type: "text",
                text: value
              }))
            }
          ]
        }
      },
      {
        headers: {
          Authorization: "Bearer EAAaTwNpMCk0BOZCdHI0f18pn7lTw8DQ8G68cHEdeKr29pW92bZA4SpQJ7AYhTt9j9kzSAU6Ld67rJqFoR7zt0bRgfdZCFDXhjRXp2UZCG2dwToSrTR9uU4FOZCrTVuAeTwsTZCmIfxvOGZARyoR8ajqn8X7ZCCXa7awgBDiauyZARx2nHCqlIIQa8udZB6aR76Of4H7wZDZD",
          "Content-Type": "application/json"
        }
      }
    ).then(response => {
      console.log("✅ Mensaje WhatsApp enviado correctamente:", response.data);
      res.status(200).json({ message: "Mensaje de WhatsApp enviado correctamente." });
    }).catch(error => {
      console.error("❌ Error al enviar mensaje de WhatsApp:", error.response?.data || error.message);
      res.status(500).json({ error: "Error al enviar mensaje de WhatsApp" });
    });
  } catch (error) {
    console.error("❌ Error en whatsappCita:", error.message);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};


exports.chatConAsistenteHoteles = async (req, res) => {
  try {
    const { mensaje } = req.body;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Crea un hilo nuevo para cada conversación (puedes mejorar esto para mantener el hilo por usuario)
    const thread = await openai.beta.threads.create();

    // Añade el mensaje del usuario al hilo
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: mensaje,
    });

    // Llama al asistente personalizado
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.ASSISTANT_ID,
    });

    // Espera a que termine el run (polling simple)
    let runStatus;
    do {
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      if (runStatus.status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } while (runStatus.status !== "completed");

    // Obtiene la respuesta del asistente
    const messages = await openai.beta.threads.messages.list(thread.id);
    const respuesta = messages.data
      .filter((msg) => msg.role === "assistant")
      .map((msg) => msg.content.map((c) => c.text.value).join("\n"))
      .join("\n");

    res.json({ respuesta });
  } catch (error) {
    console.error("❌ Error en chatConAsistenteHoteles:", error.message);
    res.status(500).json({ error: "Error al comunicarse con el asistente" });
  }
};
