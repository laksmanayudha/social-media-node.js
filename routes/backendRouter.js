const Express = require('express');
const Router = Express.Router();
const UserApiControllers = require("../controllers/back/UserApiControllers");
const ImageAPIControllers = require("../controllers/back/ImageAPIControllers");
const PostAPIControllers = require("../controllers/back/PostAPIControllers")
const Middleware = require("../module/middleware");

// API BackEnd
//user
Router.post("/user/create", UserApiControllers.apiCreateUser)
Router.post("/user/login", UserApiControllers.login)

// image
Router.post("/images", Middleware.Authorization, ImageAPIControllers.moveImage)
Router.post("/images/delete", Middleware.Authorization, ImageAPIControllers.deleteImage)

//post
Router.post("/post/create", Middleware.Authorization, PostAPIControllers.apiCreatePost)


module.exports = Router;