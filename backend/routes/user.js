const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const verifyPassword = require('../middleware/passwordValidity');



//test token
// const auth = require('../middleware/auth');

router.post('/signup', verifyPassword, userCtrl.signup); // Crée un nouvel utilisateur

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


//test token
// router.get("/test", userCtrl.test);

module.exports = router;