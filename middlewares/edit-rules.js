const User = require("../models/User.model")
const Comment = require("../models/Comment.model")

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
const canEdit = (req, res, next) => {
    const { id } = req.params

    if (req.session.currentUser._id === id || req.session.currentUser.role === 'ADMIN') {
        next()
    } else {
        res.render(`auth/login`, { errorMessage: `Please login to continue` })
        return
    }
}

const canEditComment = (req, res, next) => {
    const { commentID, } = req.params
    Comment
        .findById(commentID)
        .populate({
            path: 'owner',
            select: '_id'
        })
        .then(commentID => {
            const { _id: ownerID } = commentID.owner
            const { _id: currentUserID } = req.session.currentUser
            return currentUserID == ownerID
                ? next()
                : res.render(`auth/login`, { errorMessage: `Please login to continue` })
        })
        .catch(err => next(err))
}


module.exports = { checkEditFields, canEdit, canEditComment }