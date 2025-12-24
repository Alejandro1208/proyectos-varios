import { drizzle } from 'drizzle-orm/postgres-js'; 
import postgres from 'postgres';
import * as schema from '../shared/schema';
import type { History, Response } from '../shared/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}
const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, { schema });

export async function addHistory(
  response: string,
  originalMessage: string | null
): Promise<History> {
  const [historyItem] = await db
    .insert(schema.history)
    .values({
      responseText: response,
      originalMessage,
      copiedAt: new Date(),
    })
    .returning();

  return historyItem;
}

export async function getHistory(limit = 50): Promise<History[]> {
  return db.query.history.findMany({
    orderBy: (history, { desc }) => [desc(history.copiedAt)],
    limit,
  });
}

export async function clearHistory(): Promise<void> {
  await db.delete(schema.history);
}

export async function addResponse(
  originalMessage: string,
  generatedText: string,
  tone: string,
  context: string | null
): Promise<Response> {
  const [responseItem] = await db
    .insert(schema.responses)
    .values({
      originalMessage,
      generatedText,
      tone,
      context,
      createdAt: new Date(),
    })
    .returning();

  return responseItem;
}