module.exports = async function seedHandstand(client) {
  await client.query(
    `
    INSERT INTO skills (name, category, difficulty, description, required_equipment)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (name) DO UPDATE SET required_equipment = EXCLUDED.required_equipment
  `,
    [
      "Handstand",
      "handstand",
      "intermediate",
      "A fundamental inverted balance skill performed on the hands. Develops shoulder stability, body awareness, alignment, and balance control.",
      ["Wall"],
    ],
  );

  const skillResult = await client.query(
    `SELECT id FROM skills WHERE name = $1`,
    ["Handstand"],
  );
  const skillId = skillResult.rows[0].id;

  await client.query(
    `
    INSERT INTO milestones (skill_id, name, sequence, hold_time_seconds, description, notes)
    VALUES
      ($1, 'Wall Handstand', 1, 30,
       'Hold a chest-to-wall handstand with a straight body line.',
       'Push tall through the shoulders and maintain a hollow body position.'),
      ($1, 'Freestanding Handstand', 2, 10,
       'Balance in a freestanding handstand with full body control.',
       'Use fingertip pressure and shoulder adjustments to maintain balance.'),
      ($1, 'Tuck Handstand', 3, 15,
       'Balance in a tucked handstand with knees close to the chest.',
       'Develop balance control and compression strength.'),
      ($1, 'Straddle Handstand', 4, 15,
       'Hold a freestanding handstand with legs extended in a straddle position.',
       'Use the wider leg position to improve balance control.')
    ON CONFLICT (skill_id, sequence) DO NOTHING
  `,
    [skillId],
  );

  await client.query(`
    INSERT INTO exercises (name, category, equipment, difficulty, description)
    VALUES
      ('Wall Plank', 'pushing', 'Wall', 'beginner',
       'Face the wall in a plank position with feet elevated against the wall to build inversion confidence.'),
      ('Wall Headstand', 'pushing', 'Wall', 'beginner',
       'Hold a supported headstand against the wall to develop comfort being inverted.'),
      ('Wall Walk', 'pushing', 'Wall', 'beginner',
       'Walk the feet up a wall into a handstand position to develop strength and inversion control.'),
      ('Wall Handstand Hold', 'pushing', 'Wall', 'beginner',
       'Perform a chest-to-wall handstand focusing on straight body alignment and shoulder elevation.'),
      ('Freestanding Handstand Hold', 'pushing', 'Bodyweight', 'intermediate',
       'Balance in a freestanding handstand using fingertip control and shoulder adjustments.'),
      ('Tuck Handstand Hold', 'pushing', 'Bodyweight', 'intermediate',
       'Perform a tucked handstand emphasizing balance and compression.'),
      ('Straddle Handstand Hold', 'pushing', 'Bodyweight', 'advanced',
       'Balance in a straddle handstand while maintaining controlled body alignment.'),
      ('Wall Shoulder Taps', 'pushing', 'Wall', 'intermediate',
       'Alternate lifting one hand from a wall handstand to improve weight shifting and balance.'),
      ('Hollow Body Hold', 'core', 'Bodyweight', 'beginner',
       'Maintain a hollow body position with lower back pressed into the floor.')
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
      ($1, $3, 'warmup'),
      ($1, $4, 'warmup'),
      ($1, $5, 'progression'),
      ($1, $6, 'progression'),
      ($1, $7, 'progression'),
      ($1, $8, 'progression'),
      ($1, $9, 'accessory'),
      ($1, $10, 'accessory')
    ON CONFLICT (skill_id, exercise_id, purpose) DO NOTHING
  `,
    [
      skillId,
      exerciseMap["Wall Plank"],
      exerciseMap["Wall Headstand"],
      exerciseMap["Wall Walk"],
      exerciseMap["Wall Handstand Hold"],
      exerciseMap["Freestanding Handstand Hold"],
      exerciseMap["Tuck Handstand Hold"],
      exerciseMap["Straddle Handstand Hold"],
      exerciseMap["Wall Shoulder Taps"],
      exerciseMap["Hollow Body Hold"],
    ],
  );

  console.log("Handstand seeded.");
};
