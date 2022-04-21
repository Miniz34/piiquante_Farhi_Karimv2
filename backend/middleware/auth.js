const jwt = require('jsonwebtoken');
require('dotenv').config();

//Middleware qui vérifiera l'authentification de l'utilisateur

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //On récupère le token dans le header de la requête d'authorisation
    req.token = jwt.verify(token, process.env.TOKEN_KEY); //Création d'une variable contenant le token vérifié avec la clé hashé
    next();
  } catch (error) {
    res.status(401).json({ message: "token d'authentification invalide" });
  }
}

