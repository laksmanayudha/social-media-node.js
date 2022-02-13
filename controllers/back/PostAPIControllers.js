const PostModel = require("../../models/mongodb/post/post");
const fs = require('fs');
const fetch = require("node-fetch")

exports.apiCreatePost = async (req, res) => {

    // insert new schema DB
    const newPost = new PostModel({
        image: req.body.imageData,
        caption: req.body.caption,
        createdBy: req.user.username
    })

    let createData = await newPost.save(newPost);

    if( createData ){
        res.status(200).send({
            message: `Successfull to create post`,
            results: createData
        })
    }else{
        res.status(500).send({
            message: `Fail to create post`
        })
    }
}

exports.apiAll = async (req, res) => {
    
    await PostModel.find().then(results => {

        // write data
        let postData = []
        for(let post of results){
            let newPost = {
                postId: post._id,
                image: post.image,
                caption: post.caption,
                createdBy: post.createdBy,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }
            newPost.date = new Date(newPost.createdAt).toDateString()
            postData.push(newPost)
        }

        // send data
        res.status(200).send({
            message: `Successfull to get data`,
            results: postData
        })
    }).catch(err => {
        res.status(500).send({
            message: `Fail to get data`
        })
    })
}

exports.apiDeletePost = async (req, res) => {
    const host = "http://" + req.get("host");
    console.log(req.params.id)
    await PostModel.findByIdAndDelete({ _id: req.params.id}).then( async results => {

        let imageName = results.image.split("/")
        imageName = imageName[imageName.length - 1]
        console.log(imageName)
        console.log(req.headers.authorization)

        // delete from local
        await fetch(host + "/api/images/deletePost", {
            method: "post",
            body:JSON.stringify({
                imageName: imageName
            }),
            headers: {
                "Content-Type":"application/json",
                "Authorization":req.headers.authorization
            }
        })

        console.log("helo")
        res.status(200).send({
            message: `Success to delete data`,
            results: results
        })    
    }).catch(err => {
        res.status(500).send({
            message: `Failed to delete data`
        })
    })
}