exports.checkTokenCookies = (req, res, next) => {
    // console.log(req.cookies.token)
    if(req.cookies.token){
        next()
    }else{
        res.redirect("/login")
    }
}

exports.consoleRouter = (req, res, next) => {
    console.log(req.method, req.url);
    next();
}


