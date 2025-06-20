const router = require('express').Router();
const student_controller = require('../controllers/student_controller');



router.post('/create-student', student_controller.createStudent);
router.get('/get-student/:userId', student_controller.getStudentByUserId);
router.patch('/update-student/:id', student_controller.updateStudentById);
router.delete('/delete-student/:id', student_controller.deleteStudent);



module.exports = router;