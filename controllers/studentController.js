const Student = require("../models/Student");
const Course = require("../models/Course");

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        if (!courses.length) {
            return res.status(404).json({ message: "No courses found." });
        }

        res.status(200).json({ message: "✅ Courses retrieved successfully", courses });
    } catch (error) {
        console.error("❌ Error fetching courses:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
