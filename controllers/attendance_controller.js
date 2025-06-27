const Attendance = require('../models/attendance')


async function markAttendance(req, res) {
    try {
    const { studentId, status, note } = req.body;
    const teacherId = req.params.teacherId; // assuming you get user from auth middleware

    const attendance = await Attendance.create({
      studentId: studentId,
      status,
      note,
      createdBy: teacherId,
    });

    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
    
}

async function getStudentAttendance(req, res) {
    try {
    const { studentId } = req.params.studentId;

    const records = await Attendance.find({ student: studentId });

    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
} 





module.exports = {markAttendance, getStudentAttendance}