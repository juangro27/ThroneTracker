const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedIn, isAuthorized } = require('../middlewares/auth-rules')
const { checkEditFields } = require('../middlewares/edit-rules')
const fileUploader = require('../config/cloudinary.config')
const saltRounds = 10


router.get("/", (req, res, next) => {
    //proyectar lo utilizado
    User
        .find()
        .sort({ firstName: 1 })
        .then(user => res.render('users/list', { user }))
        .catch(err => next(err))
})


router.get("/my-profile", isLoggedIn, isAuthorized("USER"), (req, res, next) => {

    const { _id } = req.session.currentUser

    User
        .findById(_id)
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
        .then(user => res.render('users/user-edit', { user }))
        .catch(err => next(err))
})

router.post("/:id/edit", fileUploader.single('avatar'), checkEditFields, (req, res, next) => {

    const { firstName, lastName, role, oldPwd, newPwd } = req.body
    const { id } = req.params

    let avatar = req.file?.path

    User
        .findByIdAndUpdate(id, { firstName, lastName, avatar, role })
        .then(() => res.redirect(`/users/my-profile`))
        .catch(err => next(err))

    // User
    //     .findById(id)
    //     .then(user => {
    //         if (!bcrypt.compareSync(oldPwd, user.password)) {
    //             res.render('users/user-edit', { errorMessage: 'Incorrect password', user })
    //             return
    //         } else {
    //             bcrypt
    //                 .genSalt(saltRounds)
    //                 .then(salt => bcrypt.hash(newPwd, salt))
    //                 .then(password => {
    //                     User.findByIdAndUpdate(id, { password })
    //                         .catch(err => next(err))
    //                 })
    //                 .catch(err => next(err))
    //         }
    //     })
    //     .catch(err => next(err))

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