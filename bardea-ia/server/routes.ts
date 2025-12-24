import { Router } from "express";
import { z } from "zod";
import zodValidationError from "zod-validation-error";
import { generateBardo } from "./gemini"; // <-- NOMBRE CORREGIDO AQUÍ
import { addHistory, getHistory } from "./storage";

export async function registerRoutes(app: Router) {
  const server = app;

  server.post("/api/generate", async (req, res) => {
    const schema = z.object({
      context: z.string(),
      message: z.string(),
      tone: z.string(),
    });
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
      });
    }
    const { context, message, tone } = parsed.data;
    try {
      const responses = await generateBardo(context, message, tone); // <-- Y AQUÍ
      await addHistory({
        responseText: Array.isArray(responses) ? responses.join("\n") : String(responses),
        originalMessage: message || null,
        copiedAt: new Date()
      });
      return res.json({ success: true, responses });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        error: "Failed to generate responses. Please try again.",
      });
    }
  });

  server.get("/api/history", async (_req, res) => {
    try {
      const history = await getHistory();
      return res.json({ success: true, history });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to get history" });
    }
  });

  return server;
}