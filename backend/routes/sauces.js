const express = require('express');
const router = express.Router();


// Ajout des middleweares
const auth = require('../middleware/auth'); // Récupère la configuration d'authentification JsonWebToken
const multer = require('../middleware/multer-config');


// const Sauce = require('../models/Sauce');

// router.post('/', (req, res, next) => {
//   const sauce = new Sauce({
//     title: req.body.title,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     price: req.body.price,
//     userId: req.body.userId
//   });
//   sauce.save().then(
//     () => {
//       res.status(201).json({
//         message: 'Post saved successfully!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });

// router.get('/:id', (req, res, next) => {
//   Sauce.findOne({
//     _id: req.params.id
//   }).then(
//     (sauce) => {
//       res.status(200).json(sauce);
//     }
//   ).catch(
//     (error) => {
//       res.status(404).json({
//         error: error
//       });
//     }
//   );
// });

// router.put('/:id', (req, res, next) => {
//   const sauce = new Sauce({
//     _id: req.params.id,
//     name: req.body.name,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     mainPepper: req.body.mainPepper,
//     userId: req.body.userId,
//     heat: req.body.heat
//   });
//   Sauce.updateOne({ _id: req.params.id }, sauce).then(
//     () => {
//       res.status(201).json({
//         message: 'Sauce updated successfully!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });

// router.delete('/:id', (req, res, next) => {
//   Sauce.deleteOne({ _id: req.params.id }).then(
//     () => {
//       res.status(200).json({
//         message: 'Deleted!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });

// router.get('/' +
//   '', (req, res, next) => {
//     Sauce.find().then(
//       (sauces) => {
//         res.status(200).json(sauces);
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   });

// module.exports = router;

const saucesCtrl = require('../controllers/sauces');

router.post('/', auth, multer, saucesCtrl.createSauce);

router.put('/:id', auth, multer, saucesCtrl.modifySauce);

router.delete('/:id', auth, saucesCtrl.deleteSauce);

router.get('/:id', multer, saucesCtrl.getOneSauce);

router.get('/', auth, multer, saucesCtrl.getAllStuff);



router.post('/:id/like', saucesCtrl.likeSauce);
// router.post('/:id/like', auth, saucesCtrl.likeDislike);

module.exports = router;