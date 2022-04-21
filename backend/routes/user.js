// Ajout de plugin externe nécessaire pour utiliser le router d'Express
const express = require('express');

// Appel du routeur avec la méthode mise à disposition par Express
const router = express.Router();

// On associe les fonctions aux différentes routes, on importe le controller
const userCtrl = require('../controllers/user');

const verifyPassword = require('../middleware/passwordValidity');
const limiter = require('../middleware/limit')

// Création des routes Inscription et Connexion de l'API avec les middlewares
// et les controllers d'authentification et de sécurité qui leur sont appliquées

router.post('/signup', verifyPassword, userCtrl.signup); // Crée un nouvel utilisateur
router.post('/login', limiter.maxAuth, userCtrl.login); //Login sur un utilisateur existant


module.exports = router;

