const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');
const Schedule = require('../models/Schedule');

router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/profile/:rollNumber', async (req, res) => {
    try {
        const { rollNumber } = req.params;
        const student = await Student.findOne({ rollNumber });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving student profile", error });
    }
});


router.post('/login', async (req, res) => {
    const { rollNumber } = req.body;
    if (!rollNumber) {
        return res.status(400).json({ message: "Roll number is required" });
    }
    const student = await Student.findOne({ rollNumber });
    if (!student) {
        return res.status(401).json({ message: "Student not found" });
    }
    res.json({ message: "Login successful", student });
});

router.post('/register', async (req, res) => {
    try {
        const { rollNumber, courseId } = req.body;
        const student = await Student.findOne({ rollNumber });
        const course = await Course.findById(courseId);
        if (!student || !course) {
            return res.status(404).json({ error: 'Student or Course not found' });
        }
        if (course.seatsAvailable <= 0) {
            return res.status(400).json({ error: 'No seats available' });
        }
        if (student.registeredCourses.includes(courseId)) {
            return res.status(400).json({ error: 'Already registered' });
        }
        student.registeredCourses.push(courseId);
        course.seatsAvailable -= 1;
        await student.save();
        await course.save();
        res.json({ message: 'Course registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/registrations', async (req, res) => {
    try {
        const schedules = await Schedule.find().populate('courses');
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving registrations", error });
    }
});

router.post('/override', async (req, res) => {
    try {
        const { studentId, courseCode } = req.body;
        const course = await Course.findOne({ courseCode });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        let schedule = await Schedule.findOne({ rollNumber: studentId });
        if (!schedule) {
            schedule = new Schedule({ rollNumber: studentId, courses: [] });
        }
        if (schedule.courses.includes(course._id)) {
            return res.status(400).json({ message: "Student already registered for this course" });
        }
        schedule.courses.push(course._id);
        await schedule.save();
        res.json({ message: "Registration overridden successfully", schedule });
    } catch (error) {
        res.status(500).json({ message: "Error overriding registration", error });
    }
});

module.exports = router;
