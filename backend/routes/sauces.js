// Création du router qui contient les fonctions qui s'appliquent aux différentes routes pour les sauces

// Ajout de plugin externe nécessaire pour utiliser le router d'Express
const express = require('express');

// Appel du routeur avec la méthode mise à disposition par Express
const router = express.Router();


// Ajout des middleweares
const auth = require('../middleware/auth'); // Récupère la configuration d'authentification JsonWebToken
const multer = require('../middleware/multer-config'); //Import du middleware Multer pour la gestion des images


// On associe les fonctions aux différentes routes, on importe le controller
const saucesCtrl = require('../controllers/sauces');

// Création des différentes ROUTES de l'API en leurs précisant, dans l'ordre, leurs middlewares et controllers
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, multer, saucesCtrl.getOneSauce);
router.get('/', auth, multer, saucesCtrl.getAllStuff);
router.post('/:id/like', auth, saucesCtrl.likeSauce);

module.exports = router;