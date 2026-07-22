module.exports = async function seedOneArmPullup(client) {
  await client.query(
    `
    INSERT INTO skills (name, category, difficulty, description, required_equipment)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (name) DO UPDATE SET required_equipment = EXCLUDED.required_equipment
  `,
    [
      "One Arm Pull-up",
      "pulling",
      "elite",
      "An elite pulling skill requiring the ability to perform a full pull-up using a single arm. Requires exceptional unilateral pulling strength, grip, and shoulder stability.",
      ["Pull-up Bar"],
    ],
  );

  const skillResult = await client.query(
    `SELECT id FROM skills WHERE name = $1`,
    ["One Arm Pull-up"],
  );
  const skillId = skillResult.rows[0].id;

  await client.query(
    `
    INSERT INTO milestones (skill_id, name, sequence, hold_time_seconds, reps_required, description, notes)
    VALUES
      ($1, 'Archer Pull-up', 1, NULL, 5,
       'Perform 5 archer pull-ups pulling to one side while the other arm assists.',
       'Develop unilateral pulling strength while maintaining assistance from the other arm.'),

      ($1, 'One Arm Pull-up Negative', 2, NULL, 3,
       'Perform 3 controlled negatives lowering from the top with one arm.',
       'Develop eccentric strength in the pulling muscles.'),

      ($1, 'High One Arm Pull-up', 3, NULL, 1,
       'Perform a one arm pull-up pulling high enough to get the elbow past the bar.',
       'Build toward the full range of motion required for a complete rep.'),

      ($1, 'One Arm Pull-up', 4, NULL, 1,
       'Perform 1 full one arm pull-up from dead hang to chin over bar.',
       'Main milestone. Full range of motion with one arm from dead hang.')

    ON CONFLICT (skill_id, sequence) DO NOTHING
  `,
    [skillId],
  );

  await client.query(`
    INSERT INTO exercises (name, category, equipment, difficulty, description)
    VALUES
      ('Weighted Pull-ups', 'pulling', 'Pull-up Bar', 'advanced',
       'Add external weight to build maximum pulling strength required for one arm progressions.'),

      ('Archer Pull-ups', 'pulling', 'Pull-up Bar', 'advanced',
       'Pull to one side while the other arm stays extended to develop unilateral strength.'),

      ('One Arm Hang', 'pulling', 'Pull-up Bar', 'intermediate',
       'Hang from the bar with one arm to build grip and shoulder stability.'),

      ('One Arm Pull-up Negative', 'pulling', 'Pull-up Bar', 'advanced',
       'Lower slowly from the top position using one arm to build eccentric pulling strength.'),

      ('Band Assisted One Arm Pull-ups', 'pulling', 'Pull-up Bar', 'advanced',
       'Use a resistance band for assistance while developing one arm pulling strength.'),

      ('Towel Pull-ups', 'pulling', 'Pull-up Bar', 'intermediate',
       'Perform pull-ups gripping a towel to develop grip strength and unilateral pulling.'),

      ('One Arm Rows', 'pulling', 'Rings', 'intermediate',
       'Perform single arm rows on rings to build unilateral horizontal pulling strength.')

    ON CONFLICT (name) DO NOTHING
  `);

  const exercisesResult = await client.query(`SELECT id, name FROM exercises`);
  const exerciseMap = {};
  exercisesResult.rows.forEach((e) => (exerciseMap[e.name] = e.id));

  await client.query(
    `
    INSERT INTO skill_exercises (skill_id, exercise_id, purpose)
    VALUES
      ($1, $2, 'strength'),
      ($1, $3, 'progression'),
      ($1, $4, 'warmup'),
      ($1, $5, 'progression'),
      ($1, $6, 'progression'),
      ($1, $7, 'strength'),
      ($1, $8, 'accessory')
    ON CONFLICT (skill_id, exercise_id, purpose) DO NOTHING
  `,
    [
      skillId,
      exerciseMap["Weighted Pull-ups"],
      exerciseMap["Archer Pull-ups"],
      exerciseMap["One Arm Hang"],
      exerciseMap["One Arm Pull-up Negative"],
      exerciseMap["Band Assisted One Arm Pull-ups"],
      exerciseMap["Towel Pull-ups"],
      exerciseMap["One Arm Rows"],
    ],
  );

  console.log("One Arm Pull-up seeded.");
};
