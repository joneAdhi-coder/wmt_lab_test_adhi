const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET
router.get("/", async (req, res) => {
    const data = await Student.find();
    res.json(data);
});

// POST
router.post("/", async (req, res) => {
    const student = new Student(req.body);
    const saved = await student.save();
    res.json(saved);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;