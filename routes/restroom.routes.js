const router = require("express").Router()
const Restroom = require("../models/Restroom.model")
const RestroomsApi = require("../services/restroomsApi.service");
const { checkRestrooms } = require('../utils/checkRestrooms')
const { parseRestrooms } = require('../utils/parseRestrooms');


router.get("/", (req, res, next) => {

    RestroomsApi
        .getAllRestrooms(4)
        .then(({ data }) => parseRestrooms(data))
        .then(restrooms => checkRestrooms(restrooms))
        .then(restrooms => res.render("restrooms/restrooms-list", { restrooms }))
        .catch(err => next(err))

})

router.get("/location-list", (req, res, next) => {
    res.render("index", { errorMessage: `The address is required` })
})

router.post("/location-list", (req, res, next) => {

    if (req.query || req.body) {

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
        .then(restroom => res.render('restrooms/restroom-details', restroom))
        .catch(err => next(err))
})

router.post("/:id/comments", (req, res, next) => {
    res.send('POST COMENTARIOS DE BAÑOS')
})

router.post("/:id/comments/create", (req, res, next) => {
    res.send('POST CREAR COMENTARIOS DE BAÑOS')
})

router.get("/:id/comments/:id/edit", (req, res, next) => {
    res.send('GET EDITAR COMENTARIOS DE BAÑOS')
})

router.post("/:id/comments/:id/edit", (req, res, next) => {
    res.send('POST EDITAR COMENTARIOS DE BAÑOS')
})

router.post("/:id/comments/:id/delete", (req, res, next) => {
    res.send('POST BORRAR COMENTARIOS DE BAÑOS')
})

module.exports = router
