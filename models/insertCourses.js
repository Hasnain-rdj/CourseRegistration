const mongoose = require('mongoose');
const Course = require('./Course');

mongoose.connect('mongodb://localhost:27017/university_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const courses = [
    {
        courseCode: "CS101",
        name: "Introduction to Computer Science",
        department: "Computer Science",
        level: 1,
        schedule: "MWF 10:00 AM - 11:30 AM",
        days: ["Monday", "Wednesday", "Friday"],
        timeSlot: "10:00 AM - 11:30 AM",
        seatsAvailable: 30,
        prerequisites: []
    },
    {
        courseCode: "CS201",
        name: "Data Structures and Algorithms",
        department: "Computer Science",
        level: 2,
        schedule: "TTH 02:00 PM - 03:30 PM",
        days: ["Tuesday", "Thursday"],
        timeSlot: "02:00 PM - 03:30 PM",
        seatsAvailable: 25,
        prerequisites: ["CS101"]
    },
    {
        courseCode: "CS301",
        name: "Database Systems",
        department: "Computer Science",
        level: 3,
        schedule: "MW 01:00 PM - 02:30 PM",
        days: ["Monday", "Wednesday"],
        timeSlot: "01:00 PM - 02:30 PM",
        seatsAvailable: 20,
        prerequisites: ["CS201"]
    },
    {
        courseCode: "CS401",
        name: "Artificial Intelligence",
        department: "Computer Science",
        level: 4,
        schedule: "TTH 11:00 AM - 12:30 PM",
        days: ["Tuesday", "Thursday"],
        timeSlot: "11:00 AM - 12:30 PM",
        seatsAvailable: 15,
        prerequisites: ["CS301"]
    }
];

const insertCourses = async () => {
    try {
        await Course.deleteMany({});
        await Course.insertMany(courses);
        console.log('Courses inserted successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error inserting courses:', error);
    }
};

insertCourses();
