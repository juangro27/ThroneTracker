const express = require('express')
const router = express.Router()
const User = require("../models/User.model")
const { isLoggedIn, isAuthorized } = require('../middlewares/auth-rules')
const fileUploader = require('../config/cloudinary.config')

router.get("/", (req, res, next) => {

    User
        .find()
        .sort({ username: 1 })
        .then(user => res.render('users/list', { user }))
        .catch(err => console.log(err))
})

router.get("/my-profile", isLoggedIn, isAuthorized("USER"), (req, res, next) => {
    const id = req.session.currentUser._id

    User
        .findById(id)
        .then(user => res.render('users/user-details', user))
        .catch(err => next(err))

})

router.get("/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('users/user-details', user))
        .catch(err => next(err))
})

router.get("/:id/edit", (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('users/user-edit', user))
        .catch(err => next(err))
})

router.post("/:id/edit", fileUploader.single('avatar'), (req, res, next) => {
    const { username, email, role } = req.body
    const { id } = req.params
    let avatar;
    if (req.file) avatar = req.file.path

    User
        .findByIdAndUpdate(id, { username, email, avatar, role })
        .then(() => res.redirect(`/users/my-profile`))
        .catch(err => next(err))
})

router.get("/:id/delete", (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            req.session.destroy(() => res.redirect('/login'))
        })
        .catch(err => next(err))
})

module.exports = router