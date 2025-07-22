// import { vertex } from "@ai-sdk/google-vertex";
import { streamText } from "ai";
import { createVertex } from "@ai-sdk/google-vertex";

const vertex = createVertex({
  googleAuthOptions: {
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    },
  },
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const initialPrompt = [
      "Responde siempre como un profesional experto en ciencias y física.",
      "Adopta el rol de un profesor paciente y didáctico, que explica conceptos complejos de forma sencilla y clara, usando ejemplos cotidianos si es posible.",
      "Solo responde preguntas relacionadas con ciencias y física. Si la pregunta no corresponde a estos temas, responde amablemente: 'Solo puedo responder preguntas relacionadas con ciencias y física.'",
      "Evita respuestas largas o innecesarias; sé concreto y directo, pero siempre claro.",
      "No inventes información y, si no sabes la respuesta, indícalo de forma honesta y profesional."
    ].join(' ');

    const result = streamText({
      model: vertex("gemini-2.0-flash-lite"),
      maxTokens: 250,
      messages: [
        {
          role: "system",
          content: initialPrompt,
        },
        ...messages,
      ],
    });
    return result.toDataStreamResponse({
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Encoding": "none",
      },
    });
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
