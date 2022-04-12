const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


//test token
// const auth = require('../middleware/auth');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


//test token
// router.get("/test", auth, userCtrl.test);

module.exports = router;