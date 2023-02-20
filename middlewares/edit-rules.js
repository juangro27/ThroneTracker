const User = require("../models/User.model")

const checkEditFields = (req, res, next) => {

    const id = req.session.currentUser._id

    User
        .findById(id)
        .then(user => {

            if (!req.body.firstName) {
                res.send(req.body.firstName)
                res.render(`users/user-edit`, { errorMessage: `First name can't be empty`, user })
                return
            }
            else if (!req.body.lastName) {
                res.render(`users/user-edit`, { errorMessage: `Last name can't be empty`, user })
                return
            }
            else if (req.body.firstName.length <= 3) {
                res.render(`users/user-edit`, { errorMessage: `First name must be higher than 3 characters`, user })
                return
            }
            else if (req.body.lastName.length <= 3) {
                res.render(`users/user-edit`, { errorMessage: `Last name must be higher than 3 characters`, user })
                return
            }
            else next()
        })
}

module.exports = { checkEditFields }