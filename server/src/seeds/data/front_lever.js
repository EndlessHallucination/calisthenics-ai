module.exports = async function seedFrontLever(client) {
  await client.query(
    `
    INSERT INTO skills (name, category, difficulty, description, required_equipment)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (name) DO UPDATE SET required_equipment = EXCLUDED.required_equipment
  `,
    [
      "Front Lever",
      "pulling",
      "intermediate",
      "A static pulling skill where the body is held horizontally beneath a bar, parallel to the ground. Requires significant lat, core, and shoulder strength.",
      ["Pull-up Bar"],
    ],
  );

  const skillResult = await client.query(
    `SELECT id FROM skills WHERE name = $1`,
    ["Front Lever"],
  );
  const skillId = skillResult.rows[0].id;

  await client.query(
    `
    INSERT INTO milestones (skill_id, name, sequence, hold_time_seconds, description, notes)
    VALUES
      ($1, 'Tuck Front Lever', 1, 10,
       'Hold a tucked position with knees pulled to chest, body horizontal beneath the bar.',
       'Focus on scapular depression and retraction. Keep arms straight throughout.'),
      ($1, 'Advanced Tuck Front Lever', 2, 10,
       'Hold with knees tucked but back parallel to the ground, hips slightly extended.',
       'Back must be flat and parallel to the floor. Squeeze the lats hard.'),
      ($1, 'One Leg Front Lever', 3, 8,
       'Hold with one leg fully extended and one leg tucked, body as horizontal as possible.',
       'Alternate legs between sets. Keep the extended leg straight and pointed.'),
      ($1, 'Straddle Front Lever', 4, 5,
       'Hold with both legs extended and straddled wide apart.',
       'Wider straddle reduces difficulty. Work toward closing the straddle over time.'),
      ($1, 'Full Front Lever', 5, 5,
       'Hold with both legs together and fully extended, body perfectly horizontal.',
       'The complete skill. Body must be rigid from head to toe with no hip sag.')
    ON CONFLICT (skill_id, sequence) DO NOTHING
  `,
    [skillId],
  );

  await client.query(`
    INSERT INTO exercises (name, category, equipment, difficulty, description)
    VALUES
      ('Scap Pull-ups', 'pulling', 'Pull-up Bar', 'beginner',
       'Hang from a bar with straight arms. Raise the body by depressing and retracting the scapula only. No elbow bend.'),
      ('Tuck Front Lever Hold', 'pulling', 'Pull-up Bar', 'beginner',
       'Hold a tucked front lever with knees to chest and body horizontal beneath the bar.'),
      ('Advanced Tuck Front Lever Hold', 'pulling', 'Pull-up Bar', 'intermediate',
       'Hold with knees tucked and back parallel to the floor. Hips slightly extended.'),
      ('One Leg Front Lever Hold', 'pulling', 'Pull-up Bar', 'intermediate',
       'Hold front lever with one leg fully extended and one leg tucked.'),
      ('Straddle Front Lever Hold', 'pulling', 'Pull-up Bar', 'advanced',
       'Hold front lever with both legs extended and straddled wide.'),
      ('Full Front Lever Hold', 'pulling', 'Pull-up Bar', 'advanced',
       'Hold full front lever with legs together and body perfectly horizontal.'),
      ('Front Lever Raises', 'pulling', 'Pull-up Bar', 'advanced',
       'From a dead hang, raise the body to a front lever position with straight arms.'),
      ('Ice Cream Makers', 'pulling', 'Pull-up Bar', 'intermediate',
       'From a tuck front lever, rotate the body up to a tuck inverted hang and back in a controlled arc.'),
      ('Hanging Knee Raises', 'pulling', 'Pull-up Bar', 'beginner',
       'Hang from a bar and raise the knees to the chest in a controlled motion.'),
      ('Hollow Body Hold', 'core', 'Bodyweight', 'beginner',
       'Lie on the floor and hold a hollow body position with arms overhead and lower back pressed into the ground.'),
      ('Dragon Flag Negatives', 'core', 'Pull-up Bar', 'intermediate',
       'From a vertical position, lower the body slowly to horizontal while keeping it rigid.')
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
      ($1, $3, 'progression'),
      ($1, $4, 'progression'),
      ($1, $5, 'progression'),
      ($1, $6, 'progression'),
      ($1, $7, 'progression'),
      ($1, $8, 'strength'),
      ($1, $9, 'strength'),
      ($1, $10, 'warmup'),
      ($1, $11, 'accessory'),
      ($1, $12, 'accessory')
    ON CONFLICT (skill_id, exercise_id, purpose) DO NOTHING
  `,
    [
      skillId,
      exerciseMap["Scap Pull-ups"],
      exerciseMap["Tuck Front Lever Hold"],
      exerciseMap["Advanced Tuck Front Lever Hold"],
      exerciseMap["One Leg Front Lever Hold"],
      exerciseMap["Straddle Front Lever Hold"],
      exerciseMap["Full Front Lever Hold"],
      exerciseMap["Front Lever Raises"],
      exerciseMap["Ice Cream Makers"],
      exerciseMap["Hanging Knee Raises"],
      exerciseMap["Hollow Body Hold"],
      exerciseMap["Dragon Flag Negatives"],
    ],
  );

  console.log("Front Lever seeded.");
};
