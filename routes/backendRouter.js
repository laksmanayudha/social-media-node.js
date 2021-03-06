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
Router.get("/user/search/:user", Middleware.Authorization, UserApiControllers.search)
Router.get("/user/all", Middleware.Authorization, UserApiControllers.apiAll)

// image
Router.post("/images", Middleware.Authorization, ImageAPIControllers.moveImage)
Router.post("/images/delete", Middleware.Authorization, ImageAPIControllers.deleteImage)
Router.post("/images/deletePost", Middleware.Authorization, ImageAPIControllers.deleteImagePost)
Router.post("/images/save", Middleware.Authorization, ImageAPIControllers.saveImage)

//post
Router.post("/post/create", Middleware.Authorization, PostAPIControllers.apiCreatePost)
Router.get("/post/all", Middleware.Authorization, PostAPIControllers.apiAll);
Router.delete("/post/delete/:id", Middleware.Authorization, PostAPIControllers.apiDeletePost)
Router.get("/post/findPostByUser/:user", PostAPIControllers.findPostByUser)

module.exports = Router;