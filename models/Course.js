const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    level: { type: Number, required: true },
    schedule: { type: String, required: true },
    days: { type: [String], required: true },
    timeSlot: { type: String, required: true },
    seatsAvailable: { type: Number, required: true },
    prerequisites: { type: [String], default: [] },
    status: { type: String, default: "None" }
});

module.exports = mongoose.model('Course', CourseSchema);
