const { createClient } = require("@libsql/client")
const { createTables } = require("../lib/db-schema.ts")

async function setupDatabase() {
  try {
    const db = createClient({
      url: process.env.DATABASE_URL || "file:./database.db",
    })

    console.log("Connected to SQLite database")

    // Create all tables and indexes
    await db.execute(createTables)

    console.log("Database setup completed successfully!")
    console.log("Created tables: users, subscriptions, payments, template_access")
    console.log("Created all necessary indexes for performance")
  } catch (error) {
    console.error("Database setup error:", error)
  }
}

setupDatabase()
