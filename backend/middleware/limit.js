const rateLimit = require("express-rate-limit")

const maxAuth = rateLimit({
  windowMs: 5 * 60 * 1000,        // 5 minutes
  max: 10,                       //Limite de requêtes par IP
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Trop de tentatives de connexion. Compte bloqué pour 5 minutes"
})

module.exports = { maxAuth }