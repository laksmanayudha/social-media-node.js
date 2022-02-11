const Express = require('express');
const Router = Express.Router();
const UserApiControllers = require("../controllers/back/UserApiControllers");
const ImageControllers = require("../controllers/back/ImageControllers");

// API BackEnd
Router.post("/user/create", UserApiControllers.apiCreateUser)
Router.post("/user/login", UserApiControllers.login)
Router.post("/images", ImageControllers.moveImage)
Router.post("/images/delete", ImageControllers.deleteImage)


module.exports = Router;