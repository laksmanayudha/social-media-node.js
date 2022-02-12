const FormData = require("form-data");
const fetch = require("node-fetch");
const fs = require('fs');
const Path = require("path");
const RandomString = require("../../module/RandomString");


exports.postsView = (req, res) => {
    res.render("posts", {message: req.query.message});
}

exports.createPost = async (req, res) => {
    const host = "http://" + req.get("host");
    let data = req.files.imageData;
    let caption = req.body.caption

    // mv file
    let newName = RandomString(25) + data.mimetype.replace("image/", ".");
    let dirName = Path.join(__dirname, "../../public/temp-front/")

    data.mv(dirName + newName, function(err, result){
        if(err) console.log(err)
        if(result) console.log("success")
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
        fs.unlinkSync(dirName + newName)

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
        console.log(dataPost)

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