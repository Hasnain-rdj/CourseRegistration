const Course = require("../models/Course");

exports.addCourse = async (req, res) => {
    try {
        const { courseCode, title, department, prerequisites, schedule, seats } = req.body;


        if (!courseCode || !title || !department || !schedule || seats === undefined) {
            return res.status(400).json({ error: "All fields (except prerequisites) are required." });
        }


        const existingCourse = await Course.findOne({ courseCode });
        if (existingCourse) {
            return res.status(400).json({ error: "Course with this code already exists." });
        }

        const newCourse = new Course({ courseCode, title, department, prerequisites, schedule, seats });
        await newCourse.save();

        res.status(201).json({ message: "✅ Course Added Successfully" });
    } catch (error) {
        console.error("❌ Error adding course:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
