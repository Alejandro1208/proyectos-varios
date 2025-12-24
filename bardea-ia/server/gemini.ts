import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not set");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash-latest" 
});

const generationConfig = {
  temperature: 1.2,
  maxOutputTokens: 2048,
  responseMimeType: "application/json",
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

export async function generateBardo(
  context: string,
  message: string,
  tone: string
) {
  try {
    const prompt = `
CONSIGNA:
Sos un experto en "bardeo" argentino en grupos de WhatsApp. Tu objetivo es que las respuestas sean más filosas, ingeniosas y divertidas que el mensaje original.
No tengas miedo de ser cruel en chiste: es humor de amigos, donde la idea es humillar un poco pero hacer reír al grupo. 

PERSONALIDAD:
- Humor negro, picante y sarcástico.
- Usá lunfardo, chicanas de fútbol, memes, referencias de barrio, dobles sentidos.
- Evitá insultos discriminatorios o violencia explícita, pero no te autocensures demasiado.
- Pensá como un amigo que siempre tiene la última palabra y gana la discusión.
- Hacé que cada respuesta suene natural, como algo que se mandaría en un grupo de WhatsApp.

FORMATO:
- Devuelve SIEMPRE un JSON válido.
- El JSON debe tener solo la clave "respuestas" con un array de EXACTAMENTE 3 strings.
- No agregues explicación ni comentarios, solo el JSON.

EJEMPLOS DE RESPUESTAS PICANTES:
{
  "respuestas": [
    "Con esa cara y todavía opinás de moda, sos un valiente.",
    "La última vez que tuviste estilo fue cuando tu vieja te vestía para el acto de la bandera.",
    "Tranqui, que esta remera no es para vos: es para gente que tiene vida social."
  ]
}

{
  "respuestas": [
    "Te jode mi remera pero a vos te jode la vida, así que estamos a mano.",
    "Decilo sin llorar que te la presto para la foto de perfil.",
    "Vos hablás de ropa y usás las mismas zapas desde el 2015."
  ]
}

{
  "respuestas": [
    "Habla el que combina medias de Boca con ojotas de River.",
    "Mi remera tiene más estilo que todo tu placard junto.",
    "La compré para no parecerme a vos, y funcionó."
  ]
}

{
  "respuestas": [
    "No había de hombre, pero vos tampoco tenías dignidad y acá estás.",
    "La única moda que conocés es la de estar soltero hace 5 años.",
    "Mejor que no había de hombre, así no te la podés comprar."
  ]
}

{
  "respuestas": [
    "Si tu opinión importara, estaría en la etiqueta de la remera.",
    "Criticás mi ropa y tenés la misma campera desde el secundario.",
    "Con lo que sabés de moda alcanza para armar un maniquí de Once."
  ]
}

{
  "respuestas": [
    "Hablás de ropa y todavía usás el mismo buzo que tenías en el TEG.",
    "La diferencia es que yo uso ropa, vos sos un meme vestido.",
    "Vos sos la prueba de que el mal gusto es hereditario."
  ]
}

CONVERSACIÓN ACTUAL:
CONTEXTO:
"${context}"

MENSAJE RECIBIDO:
"${message}"

TONO SOLICITADO:
"${tone}"

DEVOLVÉ SOLO EL JSON CON LAS RESPUESTAS.
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      safetySettings,
      generationConfig,
    });

    const jsonResponse = result.response.text();
    const parsed = JSON.parse(jsonResponse);
    if (!parsed.respuestas || !Array.isArray(parsed.respuestas)) {
      throw new Error("La respuesta de la IA no tiene el formato esperado.");
    }

    return parsed.respuestas as string[];
  } catch (error) {
    console.error("Error al generar respuestas de Gemini:", error);
    throw new Error("No se pudo generar una respuesta válida desde la IA.");
  }
}
