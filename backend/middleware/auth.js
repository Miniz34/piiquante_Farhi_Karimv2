// let jwt = require("jsonwebtoken");
// require('dotenv').config();

// module.exports = (req, res, next) => {
//   try {
//     const decodedtoken = req.headers.authorization.split('')[1];
//     const token = "TOKEN";
//     // const decodedToken = jwt.verify(token, "Secret_Key");
//     // const userId = decodedToken.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw "user invalide";
//     } else {
//       next();
//     }
//   } catch (error) {
//     res.status(401).json({ error: error | "token d'authentification invalide" });
//   }
// }

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};