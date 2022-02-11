const fetch = require("node-fetch");

exports.loginView = (req, res) => {
    res.render("login")
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

        let data = await fetch(host + "/api/user/create", reqData)
        data = await data.json()

        if( data.isAvailable ){
            res.redirect("/login")
        }else{
            res.redirect(`/signup?message=${data.message}`)
        }
    }

    
}