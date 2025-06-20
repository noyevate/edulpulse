const router = require('express').Router();
const behaviour_controller = require('../controllers/behaviour_controller');


router.post("/", behaviour_controller.createBehavior);
router.put("/:id", behaviour_controller.updateBehaviorById);
router.get("/:studentId", behaviour_controller.getStudentBehaviour);
router.delete("/:id", behaviour_controller.deleteBehaviorById);

module.exports = router;
