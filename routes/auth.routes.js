const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { checkFields, isLoggedOut, isLoggedIn } = require('../middlewares/auth-rules')
const fileUploader = require('../config/cloudinary.config')
const saltRounds = 10


router.get('/signup', isLoggedOut, (req, res, next) => res.render('auth/signup'))

router.post('/signup', isLoggedOut, fileUploader.single('avatar'), checkFields('signup'), (req, res, next) => {

    const { email, userPwd, firstName, lastName } = req.body

    let avatar = req.file?.path

    User
        .findOne({ email })
        .then(user => {
            if (user) {
                res.render('auth/signup', { errorMessage: 'Email already registered' })
                return
            }
            return bcrypt.genSalt(saltRounds)
        })
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(password => User.create({ firstName, lastName, email, avatar, password }))
        .then(user => req.session.currentUser = user)
        .then(() => res.redirect('/'))
        .catch(err => next(err))

})


router.get('/login', isLoggedOut, (req, res, next) => res.render('auth/login'))

router.post('/login', isLoggedOut, checkFields("login"), (req, res, next) => {
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
        .catch(err => next(err))
})


router.get('/logout', isLoggedIn, (req, res, next) => {


    req.session.destroy(() => res.redirect('/'))
})


module.exports = router