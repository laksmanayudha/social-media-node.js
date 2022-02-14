const Express = require('express');
const Router = Express.Router();
const UserControllers = require("../controllers/front/UserControllers");
const PostControllers = require("../controllers/front/PostControllers");
const Middleware = require("../module/middleware");


// FrontEnd
//user
Router.get("/", UserControllers.loginView)
Router.get("/login", UserControllers.loginView)
Router.post("/login/post", UserControllers.loginPost)
Router.get("/signup", UserControllers.signUpView)
Router.post("/user/create", UserControllers.createUser)
Router.get("/logout", UserControllers.logout)
Router.get("/profile", (req, res) => {
    res.send("/profile")
})

// post
Router.use(Middleware.checkToken)
Router.get("/posts", PostControllers.postsView);
Router.post("/post/create", PostControllers.createPost)
Router.post("/post/delete", PostControllers.deletePost)

module.exports = Router;