const PostModel = require("../../models/mongodb/post/post");

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