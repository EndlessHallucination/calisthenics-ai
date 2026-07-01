const express = require("express");

const router = express.Router();

const { getAllSkills, getSkillById } = require("../services/skillService");

router.get("/", async (req, res) => {
  try {
    const result = await getAllSkills();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await getSkillById(req.params.id);
    if (!result) return res.status(404).json({ error: "Skill not found" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
