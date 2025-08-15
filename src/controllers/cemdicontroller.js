const axios = require('axios');

exports.citasCemdi = async (req, res) => {
    try {
        const { numero } = req.body;

        axios.post(
            "https://api.vapi.ai/call/phone",
            {
                assistantId: "f348b602-1f71-4241-ad84-50da4a34c362",
                customer: { number: numero },
                phoneNumberId: "934fe20f-0c76-455e-91b9-7128c7906077"
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
        console.error("❌ Error en citasCemdi:", error.message);
        res.status(500).json({ error: "Error al procesar la solicitud de llamada" });
    }
};