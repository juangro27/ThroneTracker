const express = require('express')
const router = express.Router()

router.get("/restrooms/:id/", (req, res, next) => {
    res.send("GET API")
})

module.exports = router