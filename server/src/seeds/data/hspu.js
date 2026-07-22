module.exports = async function seedHSPU(client) {
  await client.query(
    `
    INSERT INTO skills (name, category, difficulty, description, required_equipment)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (name) DO UPDATE SET required_equipment = EXCLUDED.required_equipment
  `,
    [
      "Handstand Push-up",
      "pushing",
      "advanced",
      "A strength skill where the athlete performs a push-up while in a handstand position. Requires significant overhead pressing strength, shoulder stability, and body control.",
      ["Wall"],
    ],
  );

  const skillResult = await client.query(
    `SELECT id FROM skills WHERE name = $1`,
    ["Handstand Push-up"],
  );
  const skillId = skillResult.rows[0].id;

  await client.query(
    `
    INSERT INTO milestones (skill_id, name, sequence, hold_time_seconds, reps_required, description, notes)
    VALUES
      ($1, 'Wall Headstand', 1, 30, NULL,
       'Hold a stable headstand against the wall with straight body alignment.',
       'Build confidence being inverted and develop neck and shoulder awareness.'),

      ($1, 'Wall Headstand Push-up Negative', 2, NULL, 3,
       'Perform 3 slow controlled negatives from a wall headstand position.',
       'Lower as slowly as possible to develop pressing strength.'),

      ($1, 'Wall Headstand Push-up', 3, NULL, 5,
       'Perform 5 full headstand push-ups against the wall.',
       'Focus on controlled pressing and maintaining body alignment.'),

      ($1, 'Headstand Push-up', 4, NULL, 5,
       'Perform 5 headstand push-ups without wall support.',
       'Develop balance and pressing strength simultaneously.'),

      ($1, 'Handstand Push-up', 5, NULL, 1,
       'Perform 1 strict handstand push-up with full range of motion.',
       'Main milestone. Press from head to floor and back to full lockout.')

    ON CONFLICT (skill_id, sequence) DO NOTHING
  `,
    [skillId],
  );

  await client.query(`
    INSERT INTO exercises (name, category, equipment, difficulty, description)
    VALUES
      ('Pike Push-ups', 'pushing', 'Bodyweight', 'beginner',
       'Push-ups performed in a pike position to develop overhead pressing strength.'),

      ('Elevated Pike Push-ups', 'pushing', 'Bodyweight', 'intermediate',
       'Pike push-ups with feet elevated to increase the pressing angle and difficulty.'),

      ('Wall Headstand Hold', 'pushing', 'Wall', 'beginner',
       'Hold a headstand position against the wall to build inversion comfort.'),

      ('Wall Headstand Push-up Negative', 'pushing', 'Wall', 'intermediate',
       'Slowly lower from a wall headstand position to develop eccentric pressing strength.'),

      ('Wall Headstand Push-ups', 'pushing', 'Wall', 'intermediate',
       'Full headstand push-ups against the wall building overhead pressing strength.'),

      ('Freestanding Headstand Push-ups', 'pushing', 'Bodyweight', 'advanced',
       'Headstand push-ups performed without wall support requiring balance and strength.'),

      ('Wall Handstand Hold', 'pushing', 'Wall', 'beginner',
       'Hold a chest-to-wall handstand to build shoulder endurance and alignment.'),

      ('Wall Handstand Push-up Negative', 'pushing', 'Wall', 'advanced',
       'Slowly lower from a wall handstand position to build handstand push-up strength.'),

      ('Scapular Push-ups', 'pushing', 'Bodyweight', 'beginner',
       'Push-up movement focusing on scapular protraction and retraction without bending elbows.')

    ON CONFLICT (name) DO NOTHING
  `);

  const exercisesResult = await client.query(`SELECT id, name FROM exercises`);
  const exerciseMap = {};
  exercisesResult.rows.forEach((e) => (exerciseMap[e.name] = e.id));

  await client.query(
    `
    INSERT INTO skill_exercises (skill_id, exercise_id, purpose)
    VALUES
      ($1, $2, 'warmup'),
      ($1, $3, 'strength'),
      ($1, $4, 'progression'),
      ($1, $5, 'progression'),
      ($1, $6, 'progression'),
      ($1, $7, 'progression'),
      ($1, $8, 'warmup'),
      ($1, $9, 'strength'),
      ($1, $10, 'accessory')
    ON CONFLICT (skill_id, exercise_id, purpose) DO NOTHING
  `,
    [
      skillId,
      exerciseMap["Pike Push-ups"],
      exerciseMap["Elevated Pike Push-ups"],
      exerciseMap["Wall Headstand Hold"],
      exerciseMap["Wall Headstand Push-up Negative"],
      exerciseMap["Wall Headstand Push-ups"],
      exerciseMap["Freestanding Headstand Push-ups"],
      exerciseMap["Wall Handstand Hold"],
      exerciseMap["Wall Handstand Push-up Negative"],
      exerciseMap["Scapular Push-ups"],
    ],
  );

  console.log("HSPU seeded.");
};
