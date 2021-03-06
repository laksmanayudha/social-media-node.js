const JWTVerify = require("./JWTVerify")

exports.Authorization = async (req, res, next) => {
    // console.log(req.headers.authorization)
    if(req.headers.authorization){
        
        // authorization
        let userData = await JWTVerify.JWTVerify(req.headers.authorization)
        if( userData ){
            req.user = userData
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

exports.checkToken = async (req, res , next) => {
    if(req.cookies.token){
        // check token
        let userData = await JWTVerify.JWTVerify(req.cookies.token)
        if( userData ){
            req.user = userData
            next()
        }else{
            res.status(400).redirect("/login")
        }
    }else{
        res.status(400).redirect("/login")
    }
}

exports.consoleRouter = (req, res, next) => {
    console.log(req.method, req.url);
    next();
}


