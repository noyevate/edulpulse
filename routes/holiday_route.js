const router = require('express').Router();
const holiday_controller = require('../controllers/holiday_controller');


router.post("/", holiday_controller.createHoliday);
router.put("/:id", holiday_controller.updateHolidayById);
router.delete("/:id", holiday_controller.deleteHolidayById);

module.exports = router;
