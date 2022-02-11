const Express = require('express');
const Router = Express.Router();
const UserViewControllers = require("../controllers/front/UserViewControllers");
const PostControllers = require("../controllers/front/PostControllers");
const Middleware = require("../module/middleware");


// FrontEnd
Router.get("/", UserViewControllers.loginView)
Router.get("/login", UserViewControllers.loginView)
Router.post("/login/post", UserViewControllers.loginPost)
Router.get("/signup", UserViewControllers.signUpView)
Router.post("/user/create", UserViewControllers.createUser)

Router.use(Middleware.checkTokenCookies)
Router.get("/posts", PostControllers.postsView);

module.exports = Router;