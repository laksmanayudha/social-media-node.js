const Express = require('express');
const Router = Express.Router();
const BackEndRouter = require("./backendRouter");
const FrontEndRouter = require("./frontendRouter");

Router.use("/api", BackEndRouter);
Router.use(FrontEndRouter);

module.exports = Router;