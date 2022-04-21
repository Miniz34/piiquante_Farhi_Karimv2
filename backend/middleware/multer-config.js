const multer = require('multer');

// On crée un dictionnaire des types MIME pour définire le format des images
// Donc la creation d'un objet pour ajouter une extention en fonction du type mime du ficher

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// On crée un objet de configuration pour préciser à multer où enregistrer les fichiers images et les renommer

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // On passe le dossier images qu'on a créé dans le backend
    callback(null, 'images');
  },
  //Définition du fichier à utiliser 
  filename: (req, file, callback) => {
    //Génération de nouveau nom, remplacement des espaces par des underscore
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];

    //génération du nom complet du fichier : Nom d'origine + date + . + extension
    callback(null, name + Date.now() + '.' + extension);
  }
});

//Export du module avec l'objet storage, single pour préciser que le fichier et unique, on précise que c'est une image
module.exports = multer({ storage: storage }).single('image');