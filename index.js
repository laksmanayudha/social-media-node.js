const Express = require('express')
const App = Express();
const PORT = 3000;

// setting middleware
App.use(Express.json());
App.use(Express.urlencoded({ extended: true }))
App.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

// listen
App.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// routing
const Router = require("./routes/routes")
App.use(Router);
