const router = require('express').Router();
const event_controller = require('../controllers/event_controller');


router.post("/", event_controller.createEvent);
router.get("/", event_controller.getSchoolEvents)
router.put("/:id", event_controller.updateEventById);
router.delete("/:id", event_controller.deleteEventById);


module.exports = router;
