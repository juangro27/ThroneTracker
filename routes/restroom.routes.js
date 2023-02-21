const express = require('express')
const router = express.Router()
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
            .then((data) => checkRestrooms(data))
            .then(restrooms => res.render('restrooms/restrooms-list', { restrooms }))
            .catch(err => next(err))

    } else {
        res.render("index", { errorMessage: `The address is required` })
    }
})


router.get("/map", (req, res, next) => {
    res.send(req.query)
})

router.post("/map", (req, res, next) => {
    res.send(req.body)
})

router.get("/:id", (req, res, next) => {
    res.send('GET DETALLES DE BAÑOS')
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
