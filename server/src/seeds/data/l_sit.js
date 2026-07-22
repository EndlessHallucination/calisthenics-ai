module.exports = async function seedLSit(client) {
  await client.query(
    `
    INSERT INTO skills (name, category, difficulty, description, required_equipment)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (name) DO UPDATE SET required_equipment = EXCLUDED.required_equipment
  `,
    [
      "L-Sit",
      "misc",
      "intermediate",
      "A static compression hold where the legs are extended parallel to the ground while supporting the body on straight arms. Requires hip flexor strength, tricep strength, and core compression.",
      ["Parallettes"],
    ],
  );

  const skillResult = await client.query(
    `SELECT id FROM skills WHERE name = $1`,
    ["L-Sit"],
  );
  const skillId = skillResult.rows[0].id;

  await client.query(
    `
    INSERT INTO milestones (skill_id, name, sequence, hold_time_seconds, reps_required, description, notes)
    VALUES
      ($1, 'L-Hang', 1, 10, NULL,
       'Hang from a bar with legs extended parallel to the ground.',
       'Develop hip flexor strength and compression in the hanging position.'),

      ($1, 'Foot Supported L-Sit', 2, 20, NULL,
       'Hold an L-sit position with one or both heels lightly touching the floor.',
       'Build pushing and compression strength before full L-sit.'),

      ($1, 'Tuck L-Sit', 3, 10, NULL,
       'Hold a tucked L-sit with knees pulled toward the chest.',
       'Develop the pushing and shoulder depression strength needed for L-sit.'),

      ($1, 'One Leg Bent L-Sit', 4, 10, NULL,
       'Hold with one leg extended and one leg tucked.',
       'Alternate legs to build toward the full L-sit position.'),

      ($1, 'One Leg L-Sit', 5, 10, NULL,
       'Hold with one leg fully extended and one leg bent.',
       'Build unilateral compression strength before full L-sit.'),

      ($1, 'L-Sit', 6, 10, NULL,
       'Hold a full L-sit with both legs extended parallel to the ground.',
       'Main milestone. Keep legs straight, toes pointed, and arms locked.')

    ON CONFLICT (skill_id, sequence) DO NOTHING
  `,
    [skillId],
  );

  await client.query(`
    INSERT INTO exercises (name, category, equipment, difficulty, description)
    VALUES
      ('Support Hold', 'pushing', 'Parallettes', 'beginner',
       'Hold a straight arm support position on parallettes to build shoulder depression strength.'),

      ('Tuck L-Sit Hold', 'core', 'Parallettes', 'beginner',
       'Hold a tucked L-sit position on parallettes developing compression and pushing strength.'),

      ('One Leg L-Sit Hold', 'core', 'Parallettes', 'intermediate',
       'Hold with one leg extended to progress toward the full L-sit.'),

      ('Full L-Sit Hold', 'core', 'Parallettes', 'intermediate',
       'Hold a full L-sit with both legs extended parallel to the ground.'),

      ('L-Hang Hold', 'pulling', 'Pull-up Bar', 'beginner',
       'Hang from a bar with legs raised parallel to develop hip flexor compression strength.'),

      ('Seated Leg Raises', 'core', 'Bodyweight', 'beginner',
       'Raise legs from a seated position to develop hip flexor and compression strength.'),

      ('Parallel Bar Support', 'pushing', 'Dip Bars', 'beginner',
       'Hold a straight arm support on dip bars to build shoulder depression and tricep strength.'),

      ('Hollow Body Hold', 'core', 'Bodyweight', 'beginner',
       'Maintain a hollow body position to develop the core tension required for L-sit.')

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
      ($1, $7, 'strength'),
      ($1, $8, 'strength'),
      ($1, $9, 'accessory')
    ON CONFLICT (skill_id, exercise_id, purpose) DO NOTHING
  `,
    [
      skillId,
      exerciseMap["Support Hold"],
      exerciseMap["Tuck L-Sit Hold"],
      exerciseMap["One Leg L-Sit Hold"],
      exerciseMap["Full L-Sit Hold"],
      exerciseMap["L-Hang Hold"],
      exerciseMap["Seated Leg Raises"],
      exerciseMap["Parallel Bar Support"],
      exerciseMap["Hollow Body Hold"],
    ],
  );

  console.log("L-Sit seeded.");
};
