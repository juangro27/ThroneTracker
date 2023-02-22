const router = require("express").Router()
const Restroom = require("../models/Restroom.model")
const Comment = require("../models/Comment.model")
const RestroomsApi = require("../services/restroomsApi.service");
const { checkRestrooms } = require('../utils/checkRestrooms')
const { parseRestrooms } = require('../utils/parseRestrooms');
const { findByIdAndUpdate } = require("../models/User.model");


router.get("/", (req, res, next) => {
    res.render("index", { errorMessage: `The address is required` })
})

router.get("/search", (req, res, next) => {
    res.render("restrooms/restroom-search")
})


router.post("/search", (req, res, next) => {

    if (req.body) {

        const { lat, lng } = req.body

        RestroomsApi
            .getRestroomsByLocation(lat, lng)
            .then(({ data }) => parseRestrooms(data))
            .then(restrooms => checkRestrooms(restrooms))
            .then(restrooms => res.render('restrooms/restrooms-list', { restrooms }))
            .catch(err => next(err))

    } else {
        res.render("index", { errorMessage: `The address is required` })
    }
})


router.get("/:id", (req, res, next) => {

    const { id } = req.params

    Restroom
        .findById(id)
        .populate({
            path: "comments",
            select: '-restroom -updatedAt',
            populate: {
                path: 'owner',
                select: '-password -email -role -createdAt -updatedAt'
            }
        })
        .then(restroom => res.render('restrooms/restroom-details', restroom))
        .catch(err => next(err))
})


router.post("/:id/comments", (req, res, next) => {

    res.send('POST COMENTARIOS DE BAÑOS')
})

router.post("/:id/comments/create", (req, res, next) => {

    const { comment } = req.body
    const { id: restroom } = req.params
    const { _id: owner } = req.session.currentUser

    Comment
        .create({ comment, owner })
        .then(comment => Restroom
            .findByIdAndUpdate(restroom, { $push: { comments: comment } }))
        .then(() => res.redirect(`/restrooms/${restroom}`))
        .catch(err => next(err))

})

router.get("/:id/comments/:commentID/edit", (req, res, next) => {
    const { commentID, id } = req.params

    Comment
        .findById(commentID)
        .populate({
            path: 'owner',
            select: '-password -email -role -createdAt -updatedAt'
        })
        .then(comment => res.render('restrooms/comment-edit', comment))
        .catch(err => next(err))

})

router.post("/:id/comments/:commentID/edit", (req, res, next) => {
    const { commentID, id } = req.params
    const { comment } = req.body
    Comment
        .findByIdAndUpdate(commentID, { comment })
        .then(() => res.redirect(`/restrooms/${id}`))
        .catch(err => next(err))

})

router.get("/:id/comments/:commentID/delete", (req, res, next) => {
    const { commentID, id } = req.params
    Comment
        .findByIdAndDelete(commentID)
        .then(() => Restroom
            .findByIdAndUpdate(id, { $pull: { comments: commentID } }))
        .then(() => res.redirect(`/restrooms/${id}`))
        .catch(err => next(err))
})

module.exports = router
