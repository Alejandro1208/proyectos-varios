import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Response schema for AI-generated responses
export const responses = pgTable("responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  originalMessage: text("original_message").notNull(),
  context: text("context"),
  tone: text("tone").notNull(),
  generatedText: text("generated_text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// History schema for copied responses
export const history = pgTable("history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  responseText: text("response_text").notNull(),
  originalMessage: text("original_message"),
  copiedAt: timestamp("copied_at").defaultNow().notNull(),
});

// Request schema for generating responses
export const generateRequestSchema = z.object({
  message: z.string().min(1, "El mensaje es requerido"),
  context: z.string().optional(),
  tone: z.enum(["picante", "sarcastico", "chistoso", "inteligente"]),
});

// Response schemas
export const insertResponseSchema = createInsertSchema(responses).omit({
  id: true,
  createdAt: true,
});

export const insertHistorySchema = createInsertSchema(history).omit({
  id: true,
  copiedAt: true,
});

export type ToneType = "picante" | "sarcastico" | "chistoso" | "inteligente";
export type GenerateRequest = z.infer<typeof generateRequestSchema>;
export type InsertResponse = z.infer<typeof insertResponseSchema>;
export type Response = typeof responses.$inferSelect;
export type InsertHistory = z.infer<typeof insertHistorySchema>;
export type History = typeof history.$inferSelect;