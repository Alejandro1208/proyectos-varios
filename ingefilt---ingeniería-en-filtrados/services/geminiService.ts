import { GoogleGenAI } from "@google/genai";

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found via process.env.API_KEY");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: `You are an expert industrial engineer assistant for 'Ingefilt'. 
        The company sells 'Continuous Slot Wedge Wire Screens' (Filtros de Ranura Continua) made of stainless steel.
        Answer technical questions about filtration, slot sizes, open area percentages, and industrial applications (mining, water wells, food processing).
        Keep answers concise (under 80 words), professional, and persuasive. Answer in Spanish.`,
      }
    });

    return response.text || "Lo siento, no pude generar una respuesta en este momento.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    throw new Error("Error de conexión con el asistente AI.");
  }
};