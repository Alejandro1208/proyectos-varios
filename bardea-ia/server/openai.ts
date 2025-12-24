import OpenAI from "openai";
import { ToneType } from "@shared/schema";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface GenerateResponsesOptions {
  message: string;
  context?: string;
  tone: ToneType;
}

const tonePrompts = {
  picante: "Genera respuestas picantes y directas, con humor mordaz pero sin ser hiriente. Usa lunfardo argentino.",
  sarcastico: "Genera respuestas sarcásticas e irónicas, con humor inteligente y sutilmente burlón. Usa lunfardo argentino.",
  chistoso: "Genera respuestas divertidas y graciosas, enfocadas en hacer reír con humor ligero. Usa lunfardo argentino.",
  inteligente: "Genera respuestas ingeniosas y elegantes, mostrando superioridad intelectual de forma sutil. Usa lunfardo argentino."
};

export async function generateBardeaResponses({
  message,
  context = "",
  tone
}: GenerateResponsesOptions): Promise<string[]> {
  const contextPrompt = context 
    ? `\n\nContexto de la situación: ${context}` 
    : "";

  const systemPrompt = `Eres un experto en "bardeo" argentino - el arte de las respuestas ingeniosas y divertidas entre amigos. Tu trabajo es generar respuestas letales para el mensaje que te envíen.

REGLAS IMPORTANTES:
1. El "bardeo" es humor amistoso, NO bullying ni agresión
2. Las respuestas deben ser ingeniosas, divertidas y creativas
3. Usa lunfardo y modismos argentinos para que suene auténtico
4. ${tonePrompts[tone]}
5. Genera exactamente 4 respuestas diferentes
6. Cada respuesta debe ser única y original
7. Las respuestas deben ser apropiadas para el contexto dado

Responde SOLO con un JSON válido en este formato:
{
  "responses": [
    "respuesta 1",
    "respuesta 2", 
    "respuesta 3",
    "respuesta 4"
  ]
}`;

  const userPrompt = `Mensaje a responder: "${message}"${contextPrompt}

Genera 4 respuestas de bardeo en tono ${tone}.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.9,
      max_tokens: 800
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    if (!result.responses || !Array.isArray(result.responses)) {
      throw new Error("Invalid response format from OpenAI");
    }

    return result.responses.slice(0, 4); // Ensure we only return 4 responses
  } catch (error) {
    console.error("Error generating responses:", error);
    throw new Error("Failed to generate responses. Please try again.");
  }
}