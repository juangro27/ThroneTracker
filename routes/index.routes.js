const express = require('express')
const router = express.Router()
const transporter = require('../config/transporter.config')

router.get("/", (req, res, next) => {
  res.render("index", { layout: false })
})

router.get("/contact", (req, res, next) => {
  res.render("contact")
})

router.post('/contact', (req, res, next) => {
  const { email, subject, message } = req.body

  transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: subject,
    text: message,
    html: `<b>${message}</b>`
  })
    .then(info => res.render('email-sent', { email, subject, message, info }))
    .catch(error => next(error));
})


router.get("/about-us", (req, res, next) => {
  res.render('about-us')
})

module.exports = router
