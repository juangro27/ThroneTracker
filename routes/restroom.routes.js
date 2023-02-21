const express = require('express')
const router = express.Router()
const RestroomsApi = require("../services/restroomsApi.service");
const checkRestrooms = require('../utils/checkRestrooms')

router.get("/", (req, res, next) => {
    RestroomsApi
        .getAllRestrooms(4)
        .then((data) => checkRestrooms(data))
        .then(restrooms => res.send(restrooms))
        .catch(err => next(err))
})


router.get("/map", (req, res, next) => {
    res.send('GET MAPA DE BAÑOS')
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
