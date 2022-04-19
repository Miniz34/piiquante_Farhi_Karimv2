const { log } = require('console');
const fs = require('fs');
const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const createSauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  createSauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  })
    .then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};


exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId == req.token.userId) {
        const sauceObject = req.file ?
          {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          } : { ...req.body };//Sauce.findById(req.params.id)
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(sauce => res.status(200).json({ message: 'Objet modifié !' }))
          .catch((error) => res.status(404).json({ error }));
      } else {
        res.status(400).json({ message: 'modification impossible, identification erronée !' });
      }
    })
    .catch(error => res.status(500).json({ error }));
};



// exports.modifySauce = (req, res, next) => {
//   sauce.findOne({ _id: req.params.id })
//     .then(sauce => {
//       // if (sauce.userId == req.token.userId) {
//       console.log("test");
//       const sauceObject = req.file ?
//         {
//           ...JSON.parse(req.body.sauce),
//           imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//         } : { ...req.body }
//       sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
//         .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
//         .catch(error => res.status(400).json({ error }))

//       // }
//     })
// }

// exports.modifySauce = (req, res, next) => {

//   sauce.findOne({ _id: req.params.id })
//     .then(sauce => {
//       testSauce = sauce.userId
//       testSauceDeux = req.token.userId
//       if (sauce.userId == req.token.userId) {
//         sauce.updateOne({ sauce: req.body })
//           .then(() => res.status(200).json({ testSauceDeux }))
//           .catch(error => res.status(400).json({ error }));
//       }

//     })

// };

exports.deleteSauce = (req, res, next) => {
  let tokenId = req.token.userId
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId == req.token.userId) {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
            .catch(error => res.status(400).json({ message: "Unauthorized" }));
        });
      }



    })

    .catch(error => res.status(401).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};



exports.likeSauce = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const sauceId = req.params.id;

  Sauce.findOne({
    _id: sauceId
  })
    .then((sauce) => {
      switch (like) {
        case 1:
          if (!sauce.usersLiked.includes(userId)) {

            sauce.usersLiked.push(userId);

          }
          if (sauce.usersDisliked.includes(userId)) {
            sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userId), 1);
          }

          break
        case -1:
          if (!sauce.usersDisliked.includes(userId)) {
            sauce.usersDisliked.push(userId);
          }
          if (sauce.usersLiked.includes(userId)) {
            sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1);
          }
          break
        case 0:
          if (sauce.usersDisliked.includes(userId)) {
            sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userId), 1);
          }
          if (sauce.usersLiked.includes(userId)) {
            sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1);
          }
          break
        default:
          res.status(400).json({ message: "Bad request" });
      }
      sauce.likes = sauce.usersLiked.length;
      sauce.dislikes = sauce.usersDisliked.length

      // sauce.updateOne({ _id: req.params.id }, sauce);
      sauce.save()
        .then(mysauce => res.status(200).json({ message: 'Sauce notée !' }))
        .catch((error) => res.status(404).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
}









