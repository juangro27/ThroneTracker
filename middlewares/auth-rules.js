const checkEmptyFields = (type) => (req, res, next) => {
    if (type === 'signup' || type === 'login') {
        if (type === '${type}`' && !req.body.username) {
            res.render(`auth/${type}`, { errorMessage: `Username can't be empty` })
            return
        }
        else if (type === 'signup' && req.body.username.length <= 3) {
            res.render(`auth/${type}`, { errorMessage: `Username must be higher than 3 characters` })
            return
        }
        else if (!req.body.email) {
            res.render(`auth/${type}`, { errorMessage: `Email can't be empty` })
            return
        }
        else if (!req.body.userPwd) {
            res.render(`auth/${type}`, { errorMessage: `Password can't be empty` })
            return
        }
        else if (type === 'signup' && req.body.userPwd.length <= 7) {
            res.render(`auth/${type}`, { errorMessage: `Password must be higher or equal than 8 characters` })
            return
        } else {
            next()
        }
    }
}

const isLoggedIn = (req, res, next) => {
    req.session.currentUser
        ? next()
        : res.render('auth/login', { errorMessage: 'Please login to continue' })
}

const isLoggedOut = (req, res, next) => {
    !req.session.currentUser
        ? next()
        : res.redirect('/users/my-profile')
}

const isAuthorized = (...roles) => (req, res, next) => {
    if (req.session.currentUser && roles.includes(req.session.currentUser.role)) {
        next()
    }
    else {
        res.render('auth/login', { errorMessage: 'You do not have permits' })
    }
}

const canEdit = (req, res, next) => {
    const { id } = req.params
    if (req.session.currentUser.role !== "ADMIN" && req.session.currentUser._id !== id) {
        res.redirect('/restrooms')
    } else {
        next()
    }
}

module.exports = { checkEmptyFields, isLoggedIn, isLoggedOut, isAuthorized, canEdit }