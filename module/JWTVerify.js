const JWT = require('jsonwebtoken');

exports.JWTVerify = async (tokenData) => {

    let tokenAuth = tokenData.split(" ")
    if ( tokenAuth[0] != 'Bearer' ){
        return false
    }else{
        let resultToken = await JWT.verify(tokenAuth[1], process.env.SecretKey, function(err, result){
            if(err) return false
            if(result) return result
        })

        // console.log(resultToken)
        return resultToken
    }
}