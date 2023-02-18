const express = require('express')
const router = express.Router()

router.get("/", (req, res, next) => {
    res.send('GET LISTA DE BAÑOS')
})

router.get("/map", (req, res, next) => {
    res.send('GET MAPA DE BAÑOS')
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
