const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const pool = require("../config/db");

async function seed() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `INSERT INTO skills (name, category, difficulty, description)
   VALUES ($1, $2, $3, $4), ($5, $6, $7, $8)
   ON CONFLICT (name) DO NOTHING`,
      [
        "Front Lever",
        "pulling",
        "intermediate",
        "Static pulling skill where the body is held horizontal beneath the bar.",
        "Handstand",
        "handstand",
        "advanced",
        "Balance skill performed upside down on the hands.",
      ],
    );

    const skillsResult = await client.query("SELECT id, name FROM skills");
    const skillMap = {};
    skillsResult.rows.forEach((s) => (skillMap[s.name] = s.id));

    await client.query(
      `
    INSERT INTO milestones
    (skill_id, name, sequence, hold_time_seconds)
    VALUES
        -- Front Lever
        ($1, 'Tuck Front Lever', 1, 10),
        ($1, 'Advanced Tuck Front Lever', 2, 10),
        ($1, 'One Leg Front Lever', 3, 8),
        ($1, 'Straddle Front Lever', 4, 5),
        ($1, 'Full Front Lever', 5, 5),

        -- Handstand
        ($2, 'Wall Handstand', 1, 30),
        ($2, 'Kick Up to Handstand', 2, 5),
        ($2, 'Freestanding Handstand', 3, 10),
        ($2, 'Consistent Freestanding Handstand', 4, 30)

    ON CONFLICT (skill_id, sequence) DO NOTHING

    `,
      [skillMap["Front Lever"], skillMap["Handstand"]],
    );

    await client.query("COMMIT");
    console.log("Skills seeded successfully.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seeding failed:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
