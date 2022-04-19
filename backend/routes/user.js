const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const verifyPassword = require('../middleware/passwordValidity');
const limiter = require('../middleware/limit')



router.post('/signup', verifyPassword, userCtrl.signup); // Crée un nouvel utilisateur
router.post('/login', limiter.maxAuth, userCtrl.login); //Login sur un utilisateur existant


module.exports = router;

