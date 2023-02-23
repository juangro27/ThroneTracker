const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')

module.exports = app => {
    app.set('trust proxy', 1);

    app.use(
        session({
            secret: process.env.SESS_SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: {
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                maxAge: 6000000
            },
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/juan-project'
            })
        })
    );
    app.use((req, res, next) => {
        res.locals.currentUser = req.session.currentUser

        if (req.session.currentUser) {
            req.session.currentUser.role === 'ADMIN' ? res.locals.isAdmin = true : res.locals.isUser = true
        }
        next()
    })
};
