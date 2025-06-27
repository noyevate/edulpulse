const router = require('express').Router();
const result_controller = require('../controllers/result_controller');



router.post('/', result_controller.addResult);
router.get('/:studentId', result_controller.getStudentResult);
module.exports = router;