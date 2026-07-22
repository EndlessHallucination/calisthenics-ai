module.exports = async function seedBackLever(client) {
  await client.query(
    `
    INSERT INTO skills (name, category, difficulty, description, required_equipment)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (name) DO UPDATE SET required_equipment = EXCLUDED.required_equipment
  `,
    [
      "Back Lever",
      "pulling",
      "intermediate",
      "A static pulling skill where the body is held horizontally behind the bar facing downward. Requires shoulder flexibility, back strength, and core tension.",
      ["Pull-up Bar"],
    ],
  );

  const skillResult = await client.query(
    `SELECT id FROM skills WHERE name = $1`,
    ["Back Lever"],
  );
  const skillId = skillResult.rows[0].id;

  await client.query(
    `
    INSERT INTO milestones (skill_id, name, sequence, hold_time_seconds, reps_required, description, notes)
    VALUES
      ($1, 'German Hang', 1, 10, NULL,
       'Hang from the bar with arms rotated backward to develop shoulder mobility.',
       'Essential prerequisite. Develop shoulder extension mobility gradually.'),

      ($1, 'Tuck Skin the Cat', 2, 5, NULL,
       'Rotate through a tucked position under the bar and hold briefly.',
       'Learn the movement pattern and build shoulder mobility.'),

      ($1, 'Advanced Tuck Skin the Cat', 3, 5, NULL,
       'Perform skin the cat with a more extended tuck position.',
       'Increase range of motion gradually.'),

      ($1, 'Pike Skin the Cat', 4, 5, NULL,
       'Perform skin the cat with legs extended in a pike position.',
       'Develops hamstring flexibility and shoulder strength simultaneously.'),

      ($1, 'Tuck Back Lever', 5, 10, NULL,
       'Hold a back lever position with knees tucked to the chest.',
       'Focus on depressing the scapula and maintaining body tension.'),

      ($1, 'Advanced Tuck Back Lever', 6, 10, NULL,
       'Hold back lever with knees tucked but hips more extended.',
       'Gradually extend the body toward horizontal.'),

      ($1, 'One Leg Back Lever', 7, 8, NULL,
       'Hold back lever with one leg extended and one tucked.',
       'Alternate legs between sets to develop even strength.'),

      ($1, 'Straddle Back Lever', 8, 5, NULL,
       'Hold back lever with both legs extended and straddled.',
       'Wider straddle reduces difficulty. Work toward closing the straddle.'),

      ($1, 'Back Lever', 9, 5, NULL,
       'Hold a full back lever with both legs together and body horizontal.',
       'Main milestone. Body must be straight and rigid throughout.')

    ON CONFLICT (skill_id, sequence) DO NOTHING
  `,
    [skillId],
  );

  await client.query(`
    INSERT INTO exercises (name, category, equipment, difficulty, description)
    VALUES
      ('German Hang', 'pulling', 'Pull-up Bar', 'beginner',
       'Hang from the bar with arms rotated backward to build shoulder extension mobility.'),

      ('Skin the Cat', 'pulling', 'Pull-up Bar', 'beginner',
       'Rotate the body under and through the bar developing shoulder mobility and strength.'),

      ('Tuck Back Lever Hold', 'pulling', 'Pull-up Bar', 'intermediate',
       'Hold a back lever position with knees tucked to develop horizontal pulling strength.'),

      ('Advanced Tuck Back Lever Hold', 'pulling', 'Pull-up Bar', 'intermediate',
       'Hold back lever with hips more extended and body closer to horizontal.'),

      ('Straddle Back Lever Hold', 'pulling', 'Pull-up Bar', 'advanced',
       'Hold back lever with legs straddled wide to reduce leverage.'),

      ('Full Back Lever Hold', 'pulling', 'Pull-up Bar', 'advanced',
       'Hold a full back lever with legs together and body perfectly horizontal.'),

      ('Shoulder Extension Stretch', 'mobility', 'Bodyweight', 'beginner',
       'Stretch the shoulders in extension to prepare for back lever training.'),

      ('Inverted Hang', 'pulling', 'Pull-up Bar', 'beginner',
       'Hang inverted from the bar to build comfort in the inverted position.'),

      ('Hollow Body Hold', 'core', 'Bodyweight', 'beginner',
       'Maintain a hollow body position to develop core tension required for back lever.')

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
      ($1, $8, 'mobility'),
      ($1, $9, 'warmup'),
      ($1, $10, 'accessory')
    ON CONFLICT (skill_id, exercise_id, purpose) DO NOTHING
  `,
    [
      skillId,
      exerciseMap["German Hang"],
      exerciseMap["Skin the Cat"],
      exerciseMap["Tuck Back Lever Hold"],
      exerciseMap["Advanced Tuck Back Lever Hold"],
      exerciseMap["Straddle Back Lever Hold"],
      exerciseMap["Full Back Lever Hold"],
      exerciseMap["Shoulder Extension Stretch"],
      exerciseMap["Inverted Hang"],
      exerciseMap["Hollow Body Hold"],
    ],
  );

  console.log("Back Lever seeded.");
};
