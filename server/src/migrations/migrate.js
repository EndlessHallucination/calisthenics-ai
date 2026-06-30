const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const fs = require("fs");
const pool = require("../config/db");

const migrationsDir = __dirname;

async function runMigrations() {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        filename TEXT NOT NULL UNIQUE,
        ran_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    const { rows } = await client.query("SELECT filename FROM migrations");
    const completed = new Set(rows.map((r) => r.filename));

    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    for (const file of files) {
      if (completed.has(file)) {
        console.log(`skipping: ${file}`);
        continue;
      }

      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
      console.log(`running: ${file}`);
      await client.query(sql);
      await client.query("INSERT INTO migrations (filename) VALUES ($1)", [
        file,
      ]);
      console.log(`done: ${file}`);
    }

    console.log("all migrations complete");
  } catch (err) {
    console.error("migration failed:", err.message);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();
