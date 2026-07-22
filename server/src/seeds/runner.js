const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const pool = require("../config/db");

const seedEquipment = require("./data/equipment");
const seedGeneralExercises = require("./data/general_exercises");
const seedFrontLever = require("./data/front_lever");
const seedHandstand = require("./data/handstand");
const seedMuscleUp = require("./data/muscle_up");
const seedPlanche = require("./data/planche");
const seedHSPU = require("./data/hspu");
const seedBackLever = require("./data/back_lever");
const seedLSit = require("./data/l_sit");
const seedOneArmPullup = require("./data/one_arm_pullup");

async function run() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await seedEquipment(client);
    await seedGeneralExercises(client);
    await seedFrontLever(client);
    await seedHandstand(client);
    await seedMuscleUp(client);
    await seedPlanche(client);
    await seedHSPU(client);
    await seedBackLever(client);
    await seedLSit(client);
    await seedOneArmPullup(client);

    await client.query("COMMIT");
    console.log("All seeds completed successfully.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seeding failed:", err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
