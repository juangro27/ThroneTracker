const express = require('express')
const router = express.Router()

router.get("/", (req, res, next) => {
  res.render("index")
})

router.get("/contact", (req, res, next) => {
  res.send("GET PÁGINA DE CONTACTO")
})

router.get("/about-us", (req, res, next) => {
  res.send("GET PÁGINA DE SOBRE NOSOTROS")
})

module.exports = router
