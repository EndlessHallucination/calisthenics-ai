module.exports = async function seedEquipment(client) {
  await client.query(`
    INSERT INTO equipment (name) VALUES
    ('Pull-up Bar'),
    ('Rings'),
    ('Parallettes'),
    ('Resistance Bands'),
    ('Dip Bars'),
    ('Floor'),
    ('Wall'),
    ('Bodyweight'),
    ('Ab Wheel'),
    ('Foam Roller'),
    ('Bench')
    ON CONFLICT (name) DO NOTHING
  `);
  console.log("Equipment seeded.");
};
