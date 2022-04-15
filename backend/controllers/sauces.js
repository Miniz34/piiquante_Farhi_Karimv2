const fs = require('fs');
const sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const createSauce = new sauce({
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
  sauce.findOne({
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
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  let tokenId = req.token.userId
  sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (tokenId) {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
            .catch(error => res.status(400).json({ error }));
        });
      }
    })

    .catch(error => res.status(500).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
  sauce.find().then(
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

  sauce.findOne({
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
          res.status(200).json({ message: 'Like ajouté' })

          break
        case -1:
          if (!sauce.usersDisliked.includes(userId)) {

            sauce.usersDisliked.push(userId);
          }
          if (sauce.usersLiked.includes(userId)) {
            sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1);
          }
          res.status(200).json({ message: 'Dislike ajouté' })
          break
        case 0:
          if (sauce.usersDisliked.includes(userId)) {
            sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userId), 1);


          }
          if (sauce.usersLiked.includes(userId)) {
            sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1);


          }
          res.status(200).json({ message: "Like/Dislike supprimé" })
          break
        default:

      }
      sauce.likes = sauce.usersLiked.length;
      sauce.dislikes = sauce.usersDisliked.length
      sauce.save();
    })
    .catch(error => res.status(400).json({ error }));
}









