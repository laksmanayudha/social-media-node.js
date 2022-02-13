const FormData = require("form-data");
const fetch = require("node-fetch");
const fs = require('fs');
const Path = require("path");
const RandomString = require("../../module/RandomString");


exports.postsView = async (req, res) => {
    const host = "http://" + req.get("host");

    // get all post data
    let postsData = await fetch(host + "/api/post/all", {
        method: 'get',
        headers: {
            "Authorization":req.cookies.token
        }
    })
    postsData = await postsData.json();
    console.log(req.user)

    res.render("posts", {message: req.query.message, postsData:postsData.results, user: req.user});
}

exports.createPost = async (req, res) => {
    const host = "http://" + req.get("host");
    let data = req.files.imageData;
    let caption = req.body.caption

    // mv file
    let newName = RandomString(25) + data.mimetype.replace("image/", ".");
    let dirName = Path.join(__dirname, "../../public/temp-front/")

    data.mv(dirName + newName, function(err, result){
        console.log("hello")
    })

    // create form data
    let form = new FormData()
    form.append("imageData", fs.createReadStream(dirName + newName))

    try{
        
        // api save images
        let dataImage = await fetch(host + "/api/images/save", {
            method: "post",
            body: form,
            headers: {'Authorization':req.cookies.token}
        });
        dataImage = await dataImage.json()

        // delete image file from local
        await fs.unlinkSync(dirName + newName)

        // api insert post
        let dataPost = await fetch(host + "/api/post/create",{
            method: "post",
            body: JSON.stringify({
                caption: caption,
                imageData: dataImage.temp
            }),
            headers: {
                'Authorization': req.cookies.token,
                'Content-Type': 'application/json'
            }
        });
        dataPost = await dataPost.json()

        if (dataPost){
            res.redirect(`/posts?message=${dataPost.message}`)
        }else{
            res.redirect(`/posts?message=${dataPost.message}`)
        }
    }catch(err){
        console.log(err)
        res.redirect("/posts")
    }
}

exports.deletePost = async (req, res) => {
    const host = "http://" + req.get("host");
    // console.log(req.params.id)

    try{
        let postDelete = await fetch(host + "/api/post/delete/" + req.body.postId, {
            method: "delete",
            headers: {
                "Authorization":req.cookies.token
            }
        })
        postDelete = await postDelete.json()

        if (postDelete){
            res.redirect(`/posts?message=${postDelete.message}`)
        }else{
            res.redirect(`/posts?message=${postDelete.message}`)
        }
    }catch(err){
        console.log(err)
        res.redirect("/posts")

    }
    
}