const Express = require('express');
const Router = Express.Router();
const UserControllers = require("../controllers/front/UserControllers");
const PostControllers = require("../controllers/front/PostControllers");
const Middleware = require("../module/middleware");


// FrontEnd
Router.get("/", UserControllers.loginView)
Router.get("/login", UserControllers.loginView)
Router.post("/login/post", UserControllers.loginPost)
Router.get("/signup", UserControllers.signUpView)
Router.post("/user/create", UserControllers.createUser)

Router.use(Middleware.Authorization)
Router.get("/posts", PostControllers.postsView);

module.exports = Router;