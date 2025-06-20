const router = require('express').Router();
const user_controller = require('../controllers/user_controller');



router.post('/create-account', user_controller.createAccount);
router.post('/login-parent', user_controller.loginParent);
module.exports = router;