const Express = require('express');
const Router = Express.Router();

Router.get("/", (req, res) => {
    res.render('login')
})

Router.get("/login", (req, res) => {
    res.render('login')
})

Router.get("/signup", (req, res) => {
    res.render('signup')
})

module.exports = Router;