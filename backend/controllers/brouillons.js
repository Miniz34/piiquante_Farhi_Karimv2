

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
