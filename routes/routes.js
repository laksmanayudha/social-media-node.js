const Express = require('express');
const Router = Express.Router();


// Homepages
Router.get("/", (req, res) => {
    res.render('login')
})

Router.get("/login", (req, res) => {
    res.render('login')
})

Router.get("/signup", (req, res) => {
    res.render('signup')
})

Router.get("/posts", (req, res) => {
    res.render("posts");
})

module.exports = Router;