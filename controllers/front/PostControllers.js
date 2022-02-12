const FormData = require("form-data");
const fetch = require("node-fetch");

exports.postsView = (req, res) => {
    res.render("posts");
}

exports.createPost = async (req, res) => {
    const host = "http://" + req.get("host")

    // create post request
    let formData = new FormData();
    formData.append("imageData", "JSON.stringify(req.files.imageData)");
    formData.append("caption", req.body.caption);

    let config = {
        method: 'post',
        body: formData,
        headers: {
            'Authorization':req.cookies.token
        }
    }

    // let config = {
    //     method: 'post',
    //     body: JSON.stringify({
    //         caption: req.body.caption,
    //         imageData: req.files.imageData
    //     }),
    //     headers: {
    //         "Content-Type":"application/json"
    //     }
    // }

    // send create post request to API
    try{
        let data = await fetch(host + "/api/post/create", config);
        data = await data.json()

        console.log(data)

        // if (data.success){
        //     res.redirect("/posts")
        // }else{
        //     res.redirect("/posts")
        // }
    }catch(err){
        // console.log(err)
        res.redirect("/posts")
    }
}