const router = require("express").Router()
const Restroom = require('../models/Restroom.model')

router.get("/restrooms/:id/", (req, res, next) => {
    const { id } = req.params

    Restroom
        .findById(id)
        .then(restroom => {
            res.json(restroom)
        })
        .catch(err => next(err))
})


module.exports = router