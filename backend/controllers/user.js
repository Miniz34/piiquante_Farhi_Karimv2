const bcrypt = require("bcrypt");

const user = require('../models/User'); //Import du modèle User créé via Mongoose

let jwt = require("jsonwebtoken");
const CryptoJS = require('crypto-js');
require('dotenv').config();

const key = CryptoJS.enc.Hex.parse(`${process.env.AES_KEY}`);
const iv = CryptoJS.enc.Hex.parse(`${process.env.AES_INIT_VECTOR}`);


exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) //On utilise Bcrypt pour le mot de passe, l'algorithme fera 10 tours
    .then(hash => {
      const newUser = new user({ //création de l'utilisateur
        email: CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString(),  //on passe l'email crypté via crypto-JS
        password: hash // on passe le mot de passe hashé via Bcrypt
      });
      newUser.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));


};



exports.login = (req, res, next) => {
  user.findOne({ email: CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString() }) //On cherche l'utilisateur dans la base de données cryptée
    .then(myUser => {
      if (!myUser) { return res.status(401).json({ error: 'Utilisateur non trouvé.' }); }
      bcrypt.compare(req.body.password, myUser.password) //On compare le PW pour vérifier qu'ils ont les mêmes string d'origine
        .then(valid => {
          if (!valid) { return res.status(401).json({ error: 'Mot de passe incorrect.' }); } //Si les mots de passe ne concordent pas, on renvoit une erreur
          const newToken = jwt.sign({ userId: myUser._id }, process.env.TOKEN_KEY, { expiresIn: '24h' }); //Création d'un token d'authentification
          res.setHeader('Authorization', 'Bearer ' + newToken);
          res.status(200).json({ //Renvoi du token au frontend
            userId: myUser._id,
            token: newToken
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
