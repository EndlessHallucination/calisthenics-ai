module.exports = async function seedGeneralExercises(client) {
  await client.query(`
    INSERT INTO exercises (name, category, equipment, difficulty, description)
    VALUES
      ('Pull-ups', 'pulling', 'Pull-up Bar', 'intermediate',
       'Strict pull-ups from a dead hang to build general upper body pulling strength.'),

      ('Ring Rows', 'pulling', 'Rings', 'beginner',
       'Horizontal pulling exercise using rings. Adjust body angle to control difficulty.'),

      ('Australian Pull-ups', 'pulling', 'Floor', 'beginner',
       'Horizontal pulling exercise performed under a low bar or table to develop pulling strength.'),

      ('Push-ups', 'pushing', 'Bodyweight', 'beginner',
       'Basic horizontal pushing movement targeting chest, shoulders, and triceps.'),

      ('Dips', 'pushing', 'Dip Bars', 'intermediate',
       'Vertical pushing movement developing chest, shoulders, and triceps strength.'),

      ('Pike Push-ups', 'pushing', 'Bodyweight', 'intermediate',
       'Vertical pushing progression targeting shoulders and preparing for handstand strength.'),

      ('Hollow Body Hold', 'core', 'Bodyweight', 'beginner',
       'Core exercise maintaining a hollow position with lower back pressed to the floor.'),

      ('Plank', 'core', 'Bodyweight', 'beginner',
       'Static core exercise focusing on maintaining full-body tension.'),

      ('L-Sit', 'core', 'Parallettes', 'advanced',
       'Straight-arm core compression hold with legs extended in front of the body.'),

      ('Ab Wheel Rollout', 'core', 'Ab Wheel', 'intermediate',
       'Anti-extension core exercise requiring control while extending the body forward.'),

      ('Wrist Circles', 'mobility', 'Bodyweight', 'beginner',
       'Gentle wrist mobility movement to prepare wrists for pushing and hand balancing.'),

      ('Shoulder Dislocates', 'mobility', 'Resistance Bands', 'beginner',
       'Shoulder mobility drill improving overhead range of motion and shoulder control.'),

      ('Hip Flexor Stretch', 'mobility', 'Bodyweight', 'beginner',
       'Stretch improving hip extension and lower body mobility.'),

      ('Thoracic Extension', 'mobility', 'Foam Roller', 'beginner',
       'Mobility drill improving upper back extension for overhead and handstand movements.'),

      ('Squats', 'misc', 'Bodyweight', 'beginner',
       'Basic lower body movement developing leg strength and mobility.'),

      ('Lunges', 'misc', 'Bodyweight', 'beginner',
       'Single-leg movement improving lower body strength, balance, and coordination.'),

      ('Pistol Squat Progressions', 'misc', 'Bodyweight', 'intermediate',
       'Progressive single-leg squat variations building strength and mobility toward a pistol squat.')

    ON CONFLICT (name) DO NOTHING
  `);
  console.log("General exercises seeded.");
};
