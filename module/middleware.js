const JWTVerify = require("./JWTVerify")

exports.Authorization = (req, res, next) => {
    console.log(req.cookies.token)
    if(req.cookies.token){
        
        // authorization
        if( JWTVerify.JWTVerify(req.cookies.token)){
            next()
        }else{
            // res.redirect("/login")
            res.status(400).send({message: `not authorize user`})
        }
    }else{
        // res.redirect("/login")
        res.status(400).send({message: `not authorize user`})
    }
}

exports.consoleRouter = (req, res, next) => {
    console.log(req.method, req.url);
    next();
}


