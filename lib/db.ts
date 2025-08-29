import { createClient } from "@libsql/client"

let db: ReturnType<typeof createClient>

export function getDB() {
  if (!db) {
    db = createClient({
      url: process.env.DATABASE_URL || "file:./database.db",
    })
  }
  return db
}

export async function connectDB() {
  return getDB()
}
