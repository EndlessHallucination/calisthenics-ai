module.exports = async function seedEquipment(client) {
  await client.query(`
    INSERT INTO equipment (name) VALUES
    ('Pull-up Bar'),
    ('Rings'),
    ('Parallettes'),
    ('Resistance Bands'),
    ('Dip Bars'),
    ('Floor')
    ON CONFLICT (name) DO NOTHING
  `);
  console.log("Equipment seeded.");
};
