const Express = require('express');
const Router = Express.Router();
const UserViewControllers = require("../controllers/front/UserViewControllers");
const PostControllers = require("../controllers/front/PostControllers");
const UserApiControllers = require("../controllers/back/UserApiControllers");


// FrontEnd
Router.get("/", UserViewControllers.loginView)
Router.get("/login", UserViewControllers.loginView)
Router.get("/signup", UserViewControllers.signUpView)
Router.post("/user/create", UserViewControllers.createUser)
Router.get("/posts", PostControllers.postsView);

// API BackEnd
Router.post("/api/user/create", UserApiControllers.apiCreateUser)

module.exports = Router;