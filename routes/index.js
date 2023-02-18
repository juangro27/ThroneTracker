module.exports = app => {

    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/", authRoutes)

    const userRoutes = require("./user.routes")
    app.use("/users", userRoutes)

    const restroomRoutes = require("./restroom.routes")
    app.use("/restrooms", restroomRoutes)

    const apiRoutes = require("./api.routes")
    app.use("/api", apiRoutes)
}