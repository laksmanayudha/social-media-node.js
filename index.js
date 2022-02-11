const Express = require('express');
const App = Express();
const Dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const Middleware = require("./module/middleware");
const PORT = 3000;

// setting middleware
Dotenv.config({ path: "./config/config.env" });
App.use(cookieParser())
App.use(Express.json());
App.use(Express.urlencoded({ extended: true }))
App.use(Middleware.consoleRouter)
App.set("view engine", "ejs");
App.use(Express.static('public'))

// connect to mongodb database
const connectDB = require("./models/mongodb/connections");
connectDB();

// listen
App.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// routing
// const Router = require("./routes/routes")
const Router = require("./routes/mainRouter")
App.use(Router);
