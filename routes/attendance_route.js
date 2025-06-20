const router = require('express').Router();
const attendance_controller = require('../controllers/attendance_controller');



router.post('/mark-attendance/:teacherId', attendance_controller.markAttendance);
router.get('/get-attendance/:studentId', attendance_controller.getStudentAttendance);


module.exports = router;