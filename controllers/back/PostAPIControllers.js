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

exports.apiAll = async (req, res) => {
    
    await PostModel.find().then(results => {

        // write data
        let postData = []
        for(let post of results){
            let newPost = {
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