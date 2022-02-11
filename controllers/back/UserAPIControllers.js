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

exports.login = async (req, res) => {
    let userFind = await UserModel.findOne({ "username":req.body.username }).exec()
    
    if( !userFind ){
        res.send({
            message: `Wrong username or password`,
            authenticated: false,
            statusCode: 400
        })
    }else{
        // check password
        let password = cryptr.decrypt(userFind.password)
        if ( password != req.body.password){
            res.send({
                message: `Wrong username or password`,
                authenticated: false,
                statusCode: 400
            })
        }else{
            // generate token
            let token = JWT.sign(
                { uid: userFind.__id, username: userFind.username, email: userFind.email },
                process.env.SecretKey
            )

            let dataPass = {
                username: userFind.username,
                fullname: userFind.fullname,
                email: userFind.email,
                tokenType: 'Bearer',
                token: token
            }

            // send data
            res.send({
                message: `success login`,
                authenticated: true,
                statusCode: 200,
                results: dataPass
            })
        }
    }
}