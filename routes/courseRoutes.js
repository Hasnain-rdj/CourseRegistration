const express = require('express');
const Course = require('../models/Course');
const Schedule = require('../models/Schedule');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving courses", error });
    }
});


router.get('/schedule/:rollNumber', async (req, res) => {
    try {
        const { rollNumber } = req.params;
        const schedule = await Schedule.findOne({ rollNumber }).populate('courses');
        if (!schedule) {
            return res.status(404).json({ message: "No schedule found" });
        }
        res.json(schedule.courses);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving schedule", error });
    }
});

router.get('/:courseCode', async (req, res) => {
    try {
        const { courseCode } = req.params;
        const course = await Course.findOne({ courseCode });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving course details", error });
    }
});

router.post('/', async (req, res) => {
    try {
        const courseData = req.body;

        const newCourse = new Course(courseData);
        await newCourse.save();
        res.json({ message: "Course added successfully", course: newCourse });
    } catch (error) {
        res.status(500).json({ message: "Error adding course", error });
    }
});


router.put('/:courseCode', async (req, res) => {
    try {
        const { courseCode } = req.params;
        const updateData = req.body;
        const updatedCourse = await Course.findOneAndUpdate({ courseCode }, updateData, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: "Error updating course", error });
    }
});


router.delete('/:courseCode', async (req, res) => {
    try {
        const { courseCode } = req.params;
        const deletedCourse = await Course.findOneAndDelete({ courseCode });
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting course", error });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { rollNumber, courseCode } = req.body;
        const course = await Course.findOne({ courseCode });
        if (!course || course.seatsAvailable <= 0) {
            return res.status(400).json({ message: "Course full or does not exist" });
        }


        if (course.prerequisites && course.prerequisites.length > 0) {

            let studentSchedule = await Schedule.findOne({ rollNumber }).populate('courses');
            if (!studentSchedule || !studentSchedule.courses || studentSchedule.courses.length === 0) {
                return res.status(400).json({
                    message: "Please pass the prerequisite courses first: " + course.prerequisites.join(", ")
                });
            }

            let missingPrereqs = [];
            course.prerequisites.forEach(prereq => {
                const hasPrereq = studentSchedule.courses.some(c => c.courseCode === prereq);
                if (!hasPrereq) {
                    missingPrereqs.push(prereq);
                }
            });
            if (missingPrereqs.length > 0) {
                return res.status(400).json({
                    message: "Please pass the following prerequisite courses first: " + missingPrereqs.join(", ")
                });
            }
        }

        let schedule = await Schedule.findOne({ rollNumber });
        if (schedule && schedule.courses.includes(course._id)) {
            return res.status(400).json({ message: "Already enrolled in this course" });
        }
        if (!schedule) {
            schedule = new Schedule({ rollNumber, courses: [] });
        }

        schedule.courses.push(course._id);
        course.seatsAvailable -= 1;

        await schedule.save();
        await course.save();

        res.json({ message: "Course registered successfully", schedule });
    } catch (error) {
        res.status(500).json({ message: "Error registering course", error });
    }
});


router.post('/drop', async (req, res) => {
    try {
        const { rollNumber, courseCode } = req.body;
        const course = await Course.findOne({ courseCode });
        if (!course) {
            return res.status(400).json({ message: "Course does not exist" });
        }
        const schedule = await Schedule.findOne({ rollNumber });
        if (!schedule) {
            return res.status(400).json({ message: "Schedule not found" });
        }
        schedule.courses = schedule.courses.filter(
            id => id.toString() !== course._id.toString()
        );
        course.seatsAvailable += 1;
        await schedule.save();
        await course.save();
        res.json({ message: "Course dropped successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error dropping course", error });
    }
});

module.exports = router;
