const { log } = require('console');
const fs = require('fs');
const Sauce = require('../models/Sauce');   //récupération du modèle Mongoose


//Créer une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);     // Récupération des données du front-end
  delete sauceObject._id;     //suppression de l'ID sauce, on utilise celle créée par MongoDB
  const createSauce = new Sauce({   //Création d'une sauce
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,  //Création de l'url dynamique de l'image
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  createSauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

// Récupération d'une seule sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id   //On veut que l'id de la sauce soit la même que l'id des paramêtres de requête
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

// Modification d'une sauce
exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId == req.token.userId) {   //On veut que l'ID de l'utilisateur ayant créé la sauce soit la même que le propriétaire du token
        const sauceObject = req.file ?    //Utilisation de l'opérateur ternaire pour savoir si la modification contient une image
          {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          } : { ...req.body };

        //Filter : Id de la sauce
        //Update : On applique les nouvelles données de "sauceObject"
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(sauce => res.status(200).json({ message: 'Objet modifié !' }))
          .catch((error) => res.status(404).json({ error }));
      } else {
        res.status(400).json({ message: 'modification impossible, identification erronée !' });
      }
    })
    .catch(error => res.status(500).json({ error }));
};


// Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  let tokenId = req.token.userId
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId == req.token.userId) { //On veut que l'ID de l'utilisateur ayant créé la sauce soit la même que le propriétaire du token
        const filename = sauce.imageUrl.split('/images/')[1];       // Pour extraire ce fichier, on récupère l'url de la sauce, et on le split autour de la chaine de caractères, donc le nom du fichier
        fs.unlink(`images/${filename}`, () => {        // Avec ce nom de fichier, on appelle unlink pour suppr le fichier

          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
            .catch(error => res.status(400).json({ message: "Unauthorized" }));
        });
      }
    })

    .catch(error => res.status(401).json({ error }));
};

// Récupération de toute les sauces
exports.getAllStuff = (req, res, next) => {
  //On utilise find pour trouver la liste des sauces
  Sauce.find().then(
    (sauces) => {
      // on retourne la liste des sauces
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


// Like/Dislike sauce
exports.likeSauce = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const sauceId = req.params.id;

  Sauce.findOne({
    _id: sauceId
  })
    .then((sauce) => {
      switch (like) {
        case 1:   //Like
          if (!sauce.usersLiked.includes(userId)) { //Si l'utilisateur actuel ne "like" pas déjà la sauce

            sauce.usersLiked.push(userId);          //On push l'id de l'utilisateur

          }
          if (sauce.usersDisliked.includes(userId)) { //Si l'utilisateur actuel "dislike" la sauce
            sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userId), 1); //On utilise splice pour supprimer son id du dislike
          }

          break
        case -1: //Dislike
          if (!sauce.usersDisliked.includes(userId)) { //Si l'utilisateur actuel ne "dislike" pas déjà la sauce
            sauce.usersDisliked.push(userId);          //On push l'id de l'utilisateur
          }
          if (sauce.usersLiked.includes(userId)) {      //Si l'utilisateur actuel "like" la sauce
            sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1); //On utilise splice pour supprimer son id du like
          }
          break
        case 0: //Suppression like/dislike
          if (sauce.usersDisliked.includes(userId)) {  //Si l'utilisateur actuel "dislike" la sauce
            sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(userId), 1); //On utilise splice pour supprimer son id du dislike
          }
          if (sauce.usersLiked.includes(userId)) { //Si l'utilisateur actuel "like" la sauce
            sauce.usersLiked.splice(sauce.usersLiked.indexOf(userId), 1); //On utilise splice pour supprimer son id du like
          }
          break
        default:
          res.status(400).json({ message: "Bad request" });
      }
      sauce.likes = sauce.usersLiked.length; //On additionne tous les ID présent dans l'entrée "usersLiked" pour avoir notre total de likes
      sauce.dislikes = sauce.usersDisliked.length //On additionne tous les ID présent dans l'entrée "usersDisiked" pour avoir notre total de dislikes

      sauce.save()
        .then(mysauce => res.status(200).json({ message: 'Sauce notée !' }))
        .catch((error) => res.status(404).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
}









