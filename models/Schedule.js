const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Schedule', ScheduleSchema);
