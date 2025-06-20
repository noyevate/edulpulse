const router = require('express').Router();
const timetable_controller = require('../controllers/timetable_controller');



router.post('/', timetable_controller.createTimetable);
router.get('/:id', timetable_controller.getTimetableById);
router.get('/grade/:gradeLevel', timetable_controller.getTimetablesByGradeLevel);
router.put('/grade/:gradeLevel', timetable_controller.updateTimetableByGradeLevel);
router.delete('/grade/:gradeLevel', timetable_controller.deleteTimetableByGradeLevel);


module.exports = router;