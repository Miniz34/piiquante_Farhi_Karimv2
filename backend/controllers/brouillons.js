

if (like === 1) { // Si il s'agit d'un like
  sauce.updateOne({
    _id: sauceId
  }, {
    // On push l'utilisateur et on incrémente le compteur de 1
    $push: {
      usersLiked: userId
    },
    $inc: {
      likes: +1
    }, // On incrémente de 1
  })
    .then(() => res.status(200).json({
      message: 'j\'aime ajouté !'
    }))
    .catch((error) => res.status(400).json({
      error
    }))
}
//   if (like === -1) {
//     sauce.updateOne( // S'il s'agit d'un dislike
//       {
//         _id: sauceId
//       }, {
//       $push: {
//         usersDisliked: userId
//       },
//       $inc: {
//         dislikes: +1
//       }, // On incrémente de 1
//     }
//     )
//       .then(() => {
//         res.status(200).json({
//           message: 'Dislike ajouté !'
//         })
//       })
//       .catch((error) => res.status(400).json({
//         error
//       }))
//   }
//   if (like === 0) { // Si il s'agit d'annuler un like ou un dislike
//     sauce.findOne({
_id: sauceId
    })
      .then((sauce) => {
  if (sauce.usersLiked.includes(userId)) { // Si il s'agit d'annuler un like
    sauce.updateOne({
      _id: sauceId
    }, {
      $pull: {
        usersLiked: userId
      },
      $inc: {
        likes: -1
        // },  On incrémente de -1
      })
      .then(() => res.status(200).json({
        message: 'Like retiré !'
      }))
      .catch((error) => res.status(400).json({
        error
      }))
  }
  if (sauce.usersDisliked.includes(userId)) { // Si il s'agit d'annuler un dislike
    sauce.updateOne({
      _id: sauceId
    }, {
      $pull: {
        usersDisliked: userId
      },
      $inc: {
        dislikes: -1
      }, // On incrémente de -1
    })
      .then(() => res.status(200).json({
        message: 'Dislike retiré !'
//             }))
//             .catch((error) => res.status(400).json({
//               error
//             }))
//         }
//       })
//       .catch((error) => res.status(404).json({
//         error
//       }))
//   }
// }


    //   .then(() => res.status(200).json({ message: "like" }))
    // .catch(() => res.status(400).json({ message: "vous likez déjà ce produit" }))
//   } else if (like === 0) {
//     sauce.findOne({ _id: req.params.id })
//       .then(sauce => {
//         usersliked = userId;
//         likes = -1;
//         // sauceId.like = sauceId.like--;
//       })
//       .then(() => res.status(200).json({ message: "dislike" }))
//       .catch(() => res.status(400).json({ message: "vous dislikez déjà ce produit" }))
//   } else if (like === -1) {
//     sauce.findOne({ _id: req.params.id })
//       .then(sauce => {
//         usersDisliked = userId;
//         dislikes = -1;
//         // sauceId.like = sauceId.like--;
//       })
//       .then(() => res.status(200).json({ message: "dislike" }))
//       .catch(() => res.status(400).json({ message: "vous dislikez déjà ce produit" }))
//   }

// };


// exports.likeSauce = (req, res, next) => {
//   // Pour la route READ = Ajout/suppression d'un like / dislike à une sauce
//   // Like présent dans le body
//   let like = req.body.like
//   // On prend le userID
//   let userId = req.body.userId
//   // On prend l'id de la sauce
//   let sauceId = req.params.id

//   if (like === 1) {
//     sauce.findOne({ _id: req.params.id })
//       .then(sauce => {
//         usersLiked = 1;
//       })
//       .then(() => res.status(200).json({ message: "like" }))
//       .catch(() => res.status(400).json({ message: "vous likez déjà ce produit" }));

//   }


//   // _id: sauceId,
//   //   usersLiked = usersLiked++




if(like === 0) {
        sauce.findOne({
          _id: sauceId
        })
          .then((sauce) => {
            if (sauce.usersLiked.includes(userId)) {

              sauce.update(
                { _id: sauceId },
                {

                  $pull: { usersLiked: userId },
                  $inc: { likes: -1 }

                }
              )
                .then(() => res.status(200).json({
                  message: 'like supprimé !'
                }))
                .catch((error) => res.status(400).json({
                  error
                }))
            } if (sauce.usersDisliked.includes(userId)) {

              sauce.update(
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
      }

















if (like === 0) {
      sauce.findOne({
        _id: sauceId
      })
        .then((sauce) => {
          if (sauce.usersLiked.includes(userId)) {

            sauce.updateOne(
              { _id: sauceId },
              { $pull: { usersLiked: { $in: [userId] } } },
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
    }
  }

  ezaeazeeaz






  if (like === 0) { // Si il s'agit d'annuler un like ou un dislike
    sauce.findOne({
      _id: sauceId
    })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) { // Si il s'agit d'annuler un like
          sauce.updateOne({
            _id: sauceId
          }, {
            $pull: {
              usersLiked: userId
            },
            $inc: {
              likes: -1
            }, // On incrémente de -1
          })
            .then(() => res.status(200).json({
              message: 'Like retiré !'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        }
        if (sauce.usersDisliked.includes(userId)) { // Si il s'agit d'annuler un dislike
          sauce.updateOne({
            _id: sauceId
          }, {
            $pull: {
              usersDisliked: userId
            },
            $inc: {
              dislikes: -1
            }, // On incrémente de -1
          })
            .then(() => res.status(200).json({
              message: 'Dislike retiré !'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        }
      })
      .catch((error) => res.status(404).json({
        error
      }))
  }
}






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




  exports.modifySauce = (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        if (sauce.userId == req.token.userId) {
          const sauceObject = req.file ?
            {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...req.body };
          sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet modifié !' }))
            .catch(error => res.status(400).json({ error }));
        }
      })

    exports.modifySauce = (req, res, next) => {
      let sauceObject = {};
      req.file ? (
        Sauce.findOne({
          _id: req.params.id
        }).then((sauce) => {

          const filename = sauce.imageUrl.split('/images/')[1]
          fs.unlinkSync(`images/${filename}`)
        }),
        sauceObject = {

          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename
            }`,
        }
      ) : (
        sauceObject = {
          ...req.body
        }
      )
      Sauce.updateOne(

        {
          _id: req.params.id
        }, {
        ...sauceObject,
        _id: req.params.id
      }
      )
        .then(() => res.status(200).json({
          message: 'Sauce modifiée !'
        }))
        .catch((error) => res.status(400).json({
          error
        }))
    }




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


// exports.test = (req, res) => {
//   res.status(200).json({ message: "VOus êtes connecté avec l'id : " + req.token.userId })

// }



// exports.login = (req, res, next) => {
//   user.findOne({ email: req.body.email })
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//       }
//       bcrypt.compare(req.body.password, user.password)
//         .then(valid => {
//           if (!valid) {
//             return res.status(401).json({ error: 'Mot de passe incorrect !' });
//           }
//           res.status(200).json({
//             userId: user._id,
//             token: "TOKEN"
//           });
//         })
//         .catch(error => res.status(500).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));
// };



// exports.login = (req, res) => {
//   if (req.body.email == "gerarddeux@gmail.com" && req.body.password == "aaa") {
//     let token = jwt.sign({ userId: 10 }, process.env.TOKEN_KEY);
//     res.status(200).json({ token });
//   } else {
//     res.status(401).json({ message: "Login ou mot de pass incorrect" })
//   }
// }


// exports.test = (req, res) => {
//   res.status(200).json({ message: "vous êtes authentifié" });
// }















// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -----------------------AUTH INITIAL-------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------






// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     req.token = jwt.verify(token, process.env.TOKEN_KEY);
//     const userId = req.token.userId;
//     req.auth = { userId };
//     if (req.body.userId && req.body.userId !== userId) {
//       throw 'Invalid user ID';
//     } else {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error('Invalid request!')
//     });
//   }
// };


// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------