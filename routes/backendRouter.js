const Express = require('express');
const Router = Express.Router();
const UserApiControllers = require("../controllers/back/UserApiControllers");
const ImageApiControllers = require("../controllers/back/ImageApiControllers");
const Middleware = require("../module/middleware");

// API BackEnd
Router.post("/user/create", UserApiControllers.apiCreateUser)
Router.post("/user/login", UserApiControllers.login)

Router.use(Middleware.Authorization)
Router.post("/images", ImageApiControllers.moveImage)
Router.post("/images/delete", ImageApiControllers.deleteImage)


module.exports = Router;