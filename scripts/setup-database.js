const { createClient } = require("@libsql/client")
const { createTables } = require("../lib/db-schema.ts")

async function setupDatabase() {
  try {
    const db = createClient({
      url: process.env.DATABASE_URL || "file:./database.db",
    })

    // Create all tables and indexes
    await db.execute(createTables)
  } catch (error) {
    console.error("Database setup error:", error)
  }
}

setupDatabase()
