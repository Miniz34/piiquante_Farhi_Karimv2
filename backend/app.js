const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require("helmet");


const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
// const images = require("./images");

const Sauce = require('./models/Sauce');

const app = express();
app.use(express.json());


mongoose.connect(`mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@cluster0.kh4sd.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,

  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(bodyParser.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


module.exports = app;