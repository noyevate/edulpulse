const router = require('express').Router();
const fee_controller = require('../controllers/fee_controller');

router.post('/', fee_controller.createFee);
router.get('/:gradeLevel', fee_controller.getFeesByGradeLevel);
router.put('/:gradeLevel', fee_controller.updateFeeByGradeLevel);
router.put("/:gradeLevel/:term", fee_controller.updateFeeByGradeLevelAndTerm);
router.delete('/:gradeLevel', fee_controller.deleteFeeByGradeLevel);




module.exports = router;