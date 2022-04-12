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
  sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
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


  if (like === 1) {
    sauce.updateOne(
      { _id: sauceId },
      {
        $push: { usersLiked: userId },
        $inc: { likes: 1 }
      }

    )
      .then(() => res.status(200).json({
        message: 'like ajouté'
      }))
      .catch((error) => res.status(400).json({
        error
      }))
  } if (like === -1) {
    sauce.updateOne(
      { _id: sauceId },
      {
        $push: { usersDisliked: userId },
        $inc: { dislikes: +1 }
      }
    )
      .then(() => res.status(200).json({
        message: 'disliked ajouté !'
      }))
      .catch((error) => res.status(400).json({
        error
      }))
  } if (like === 0) {
    sauce.findOne({
      _id: req.params.id
    })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) {

          sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersLiked: userId } },
            { $inc: { likes: -1 } }


          )
            .then(() => res.status(200).json({
              message: 'like supprimé !'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        } if (sauce.usersDisliked.includes(userId)) {

          sauce.updateOne(
            { _id: sauceId },
            {
              $pull: { usersDisliked: userId },
              $inc: { dislikes: -1 }
            }
          )
            .then(() => res.status(200).json({
              message: 'dislike supprimé !'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        }
      }
      )
      .catch((error) => res.status(404).json({
        error
      }))
  }
}
























