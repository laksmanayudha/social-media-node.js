const Express = require('express');
const Router = Express.Router();

Router.get("/", (req, res) => {
    res.send("hello world")
})

module.exports = Router;