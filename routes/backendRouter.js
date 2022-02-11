const Express = require('express');
const Router = Express.Router();
const UserApiControllers = require("../controllers/back/UserApiControllers");

// API BackEnd
Router.post("/user/create", UserApiControllers.apiCreateUser)
Router.post("/user/login", UserApiControllers.login)

module.exports = Router;