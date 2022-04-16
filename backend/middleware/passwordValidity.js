const passwordSchema = require('../models/password');


module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    //return res.status(400,"8 caratères minimun").send({message: 'Mot de passe pas assez fort ! ' + passwordSchema.validate(req.body.password, {list:true})});
    res.writeHead(400, '{"au moins 3 caractères : 1 majuscule, 1 minuscule, 1 chiffre"}', {
      'content-type': 'application/json'
    });
    res.end('Format de mot de passe incorrect');
  } else {
    next();
  }
};