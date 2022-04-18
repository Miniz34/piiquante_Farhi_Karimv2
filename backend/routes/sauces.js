const express = require('express');
const router = express.Router();


// Ajout des middleweares
const auth = require('../middleware/auth'); // Récupère la configuration d'authentification JsonWebToken
const multer = require('../middleware/multer-config');


const saucesCtrl = require('../controllers/sauces');

router.post('/', auth, multer, saucesCtrl.createSauce);

router.put('/:id', auth, multer, saucesCtrl.modifySauce);

router.delete('/:id', auth, saucesCtrl.deleteSauce);

router.get('/:id', multer, saucesCtrl.getOneSauce);

router.get('/', auth, multer, saucesCtrl.getAllStuff);



router.post('/:id/like', saucesCtrl.likeSauce);

module.exports = router;