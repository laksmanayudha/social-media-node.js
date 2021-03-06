const fetch = require("node-fetch");

exports.loginView = (req, res) => {
    res.render("login", {message: req.query.message})
}

exports.loginPost = async (req, res) => {
    
    // construct request
    const host = "http://" + req.get("host")
    let reqData = {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {"Content-Type": "application/json"}
    }

    // send request to API
    try{
        let data = await fetch( host + "/api/user/login", reqData )
        data = await data.json();

        // check if authenticated
        if( data.authenticated ){
            // set cookie
            res.cookie("token", data.results.tokenType + " " +  data.results.token);
            res.redirect("/posts")
        }else{
            res.redirect(`/login?message=${data.message}`)
        }
    }catch(err){
        console.log(err)
        res.redirect(`/login?message=${data.message}`)
    }
}

exports.signUpView = (req, res) => {
    res.render("signup", {message: req.query.message})
}

exports.createUser = async (req, res) => {
    // check confirm password
    if (req.body.password != req.body.confirmPassword){
        res.redirect(`/signup?message=Password mismatch`)
    }else{
        const host = "http://" + req.get("host")
        // create user
        let reqData = {
            method: "POST",
            body: JSON.stringify(req.body),
            headers: {"Content-Type": "application/json"}
        }
        // let data = fetch("http:localhost:3000/api/user/create", reqData)
        //     .then(response => response.json())
        //     .then(response => console.log("hello", response))

        try{
            let data = await fetch(host + "/api/user/create", reqData);
            data = await data.json();

            if( data.isAvailable ){
                res.redirect(`/login?message=${data.message}`);
            }else{
                res.redirect(`/signup?message=${data.message}`);
            }
        }catch(err){
            console.log(err);
            res.redirect(`/signup?message=${data.message}`);
        }
    }
}

exports.logout = (req, res) => {
    res.clearCookie("token")
    res.redirect("/login")
}

exports.profile = async (req, res) => {
    const host = "http://" + req.get("host")

    if( !req.query.user ){
        res.redirect("/posts")
    }

    // send request to API
    try{
        let data = await fetch( host + "/api/post/findPostByUser/" + req.query.user)
        data = await data.json();

        // render profile
        if( data ){
            res.render("profile", {user: req.user, userQuery: req.query.user, userData: data.results})
        }else{
            res.redirect("/posts")
        }
    }catch(err){
        console.log(err)
        res.redirect("/posts")
    }
}