const Express = require('express');
const App = Express();
const Dotenv = require('dotenv');
const PORT = 3000;
const cookieParser = require("cookie-parser")

// setting middleware
Dotenv.config({ path: "./config/config.env" });
App.use(cookieParser())
App.use(Express.json());
App.use(Express.urlencoded({ extended: true }))
App.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})
App.set("view engine", "ejs");
App.use(Express.static('public'))

// connect to mongodb database
const connectDB = require("./models/mongodb/connections");
connectDB();

// listen
App.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// routing
const Router = require("./routes/routes")
App.use(Router);
