const express = require('express');
const Course = require('../models/Course');
const Schedule = require('../models/Schedule');
const router = express.Router();

router.get('/:reportType', async (req, res) => {
    const { reportType } = req.params;
    const { download } = req.query;
    try {
        let reportData;
        if (reportType === "students") {
            reportData = await Schedule.find().populate('courses');
        } else if (reportType === "courses") {
            reportData = await Course.find({ seatsAvailable: { $gt: 0 } });
        } else if (reportType === "prerequisites") {
            reportData = await Course.find({ prerequisites: { $exists: true, $ne: [] } });
        } else {
            return res.status(400).json({ message: "Invalid report type" });
        }

        if (download && download.toLowerCase() === "true") {
            res.setHeader("Content-Disposition", `attachment; filename=${reportType}_report.txt`);
            res.setHeader("Content-Type", "text/plain");
            return res.send(JSON.stringify(reportData, null, 2));
        } else {
            return res.json(reportData);
        }
    } catch (error) {
        return res.status(500).json({ message: "Error generating report", error });
    }
});


module.exports = router;
