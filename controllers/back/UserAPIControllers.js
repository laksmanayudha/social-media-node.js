const UserModel = require("../../models/mongodb/user/user")
const JWT = require("jsonwebtoken");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SecretKey);

exports.apiCreateUser = async (req, res) => {
    
    // find available username
    let dataUser = await UserModel.findOne({ "username": req.body.username }).then(response => response).catch(err => false);

    if( dataUser ){
        res.send({
            message: `Username already exist`,
            isAvailable: false,
            statusCode: 400
        })
    }else{
        // insert new schema DB
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: cryptr.encrypt(req.body.password),
            fullname: req.body.fullname
        })

        let createData = await newUser.save(newUser);

        if ( createData ){
            res.send({
                message: `Successfull to create data`,
                isAvailable: true,
                statusCode: 200
            })
        }else{
            res.send({
                message: `Failed to create data`,
                isAvailable: false,
                statusCode: 200
            })
        }
    }

}