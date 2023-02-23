const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedIn, isAuthorized } = require('../middlewares/auth-rules')
const { checkEditFields, canEdit } = require('../middlewares/edit-rules')
const fileUploader = require('../config/cloudinary.config')
const saltRounds = 10


router.get("/", isLoggedIn, isAuthorized("ADMIN"), (req, res, next) => {

    User
        .find()
        .sort({ firstName: 1 })
        .then(user => res.render('users/users-list', { user }))
        .catch(err => next(err))
})


router.get("/my-profile", isLoggedIn, (req, res, next) => {

    const { _id } = req.session.currentUser

    User
        .findById(_id)
        .then(user => res.render('users/user-details', user))
        .catch(err => next(err))
})


router.get("/:id", isLoggedIn, canEdit, isAuthorized("ADMIN"), (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('users/user-details', user))
        .catch(err => next(err))
})


router.get("/:id/edit", isLoggedIn, canEdit, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('users/user-edit', { user }))
        .catch(err => next(err))

})

router.post("/:id/edit", isLoggedIn, canEdit, fileUploader.single('avatar'), checkEditFields, (req, res, next) => {

    const { firstName, lastName, role, oldPwd, newPwd } = req.body
    const { id } = req.params

    let avatar = req.file?.path

    User
        .findByIdAndUpdate(id, { firstName, lastName, avatar, role })
        .then(() => res.redirect(`/users/my-profile`))
        .catch(err => next(err))
})


router.get("/:id/delete", isLoggedIn, isAuthorized("ADMIN"), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})


module.exports = router