const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { checkEmptyFields, isLoggedOut, isLoggedIn } = require('../middlewares/auth-rules')
const fileUploader = require('../config/cloudinary.config')
const saltRounds = 10

router.get('/signup', isLoggedOut, (req, res, next) => res.render('auth/signup'))

router.post('/signup', isLoggedOut, fileUploader.single('avatar'), checkEmptyFields('signup'), (req, res, next) => {
    const { email, username, userPwd } = req.body
    let avatar;
    if (req.file) avatar = req.file.path
    const promises = [
        User.findOne({ email }),
        User.findOne({ username }),
    ]

    Promise
        .all(promises)
        .then(([email, username]) => {
            if (username) {
                res.render('auth/signup', { errorMessage: 'Username already registered' })
                return
            }
            else if (email) {
                res.render('auth/signup', { errorMessage: 'Email already registered' })
                return
            }
        })
        .catch(error => next(error))

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(password => User.create({ ...req.body, avatar, password }))
        .then(user => req.session.currentUser = user)
        .then(() => res.redirect('/'))
        .catch(error => next(error))

})


router.get('/login', isLoggedOut, (req, res, next) => res.render('auth/login'))

router.post('/login', isLoggedOut, checkEmptyFields("login"), (req, res, next) => {
    const { userPwd, email } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Incorrect email or password' })
                return
            } else if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.render('auth/login', { errorMessage: 'Incorrect email or password' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})


router.get('/logout', isLoggedIn, (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
        .catch(err => next(err))
})


module.exports = router