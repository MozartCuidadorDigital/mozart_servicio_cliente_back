const axios = require('axios');

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


exports.responseOnBoardingSaludMental = async (req, res) => {
    try {
        const { message } = req.body;

        if (message?.type === 'end-of-call-report' && message?.analysis?.structuredData) {
            const structuredData = message.analysis.structuredData;
            console.log("📋 Datos recibidos en /vapi/responseOnBoardingSaludMental:", structuredData);

            // Enviar los datos a la API externa
            try {
                const apiResponse = await axios.post(
                    "https://mozart-nuevo-backend.vercel.app/api/admin/createPatientNoCategory",
                    structuredData,
                    { headers: { "Content-Type": "application/json" } }
                );

                console.log("✅ Datos enviados correctamente a la API:", apiResponse.data);
                res.status(200).json({ message: "Datos procesados y enviados correctamente" });

            } catch (apiError) {
                console.error("❌ Error al enviar datos a la API externa:", apiError.response?.data || apiError.message);
                res.status(500).json({ error: "Error al enviar los datos a la API externa" });
            }

        } else {
            console.log("⚠️ No se encontró structuredData en el mensaje recibido.");
            res.status(400).json({ error: "No se encontró structuredData en el mensaje recibido." });
        }

    } catch (error) {
        console.error("❌ Error en onboardingResponse:", error.message);
        res.status(500).json({ error: "Error al procesar los datos" });
    }
};