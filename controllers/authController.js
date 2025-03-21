const Student = require("../models/Student");
const Admin = require("../models/Admin");

exports.studentLogin = async (req, res) => {
    try {
        const { rollNumber } = req.body;

        if (!rollNumber) {
            return res.status(400).json({ error: "Roll Number is required." });
        }

        const student = await Student.findOne({ rollNumber });

        if (!student) {
            return res.status(401).json({ error: "Invalid Roll Number" });
        }

        res.status(200).json({ message: "✅ Student Login Successful", student });
    } catch (error) {
        console.error("❌ Student Login Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and Password are required." });
        }

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({ error: "Invalid Username or Password" });
        }

        if (password !== admin.password) {
            return res.status(401).json({ error: "Invalid Username or Password" });
        }

        res.status(200).json({ message: "✅ Admin Login Successful", admin });
    } catch (error) {
        console.error("❌ Admin Login Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
