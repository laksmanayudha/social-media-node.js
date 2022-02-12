const JWTVerify = require("./JWTVerify")

exports.Authorization = async (req, res, next) => {
    // console.log(req.headers.authorization)
    if(req.headers.authorization){
        
        // authorization
        if( await JWTVerify.JWTVerify(req.headers.authorization)){
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

exports.checkToken = (req, res , next) => {
    if(req.cookies.token){
        next()
    }else{
        res.status(400).redirect("/login")
    }
}

exports.consoleRouter = (req, res, next) => {
    console.log(req.method, req.url);
    next();
}


