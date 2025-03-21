require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const courseRoutes = require('./routes/courseRoutes');
const reportsRoutes = require('./routes/reports');

const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "10mb" }));


mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
        console.error("❌ MongoDB Connection Failed:", err);
        process.exit(1);
    });

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/reports', reportsRoutes);

app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});


process.on("unhandledRejection", (err) => {
    console.error("❗ Unhandled Rejection:", err);
    process.exit(1);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
