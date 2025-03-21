const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Admin = require('../models/Admin');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {

        const admin = await Admin.findOne({ username });

        if (!admin) {
            console.log("Admin not found");
            return res.status(400).json({ message: "Invalid Admin Credentials" });
        }

        if (admin.password !== password) {
            console.log("Password mismatch");
            return res.status(400).json({ message: "Invalid Admin Credentials" });
        }

        res.status(200).json({ message: "Login successful", admin });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.post('/add-course', async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.json({ message: 'Course added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error adding course' });
    }
});

router.put('/update-course/:id', async (req, res) => {
    try {
        await Course.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Course updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error updating course' });
    }
});


router.delete('/delete-course/:id', async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting course' });
    }
});

router.get('/profile/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


module.exports = router;
