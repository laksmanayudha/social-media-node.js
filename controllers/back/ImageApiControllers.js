const Path = require("path")
const RandomString = require("../../module/RandomString");
const fs = require('fs');

exports.moveImage = (req, res) => {
    let data = req.files.imageData;
    // console.log(data)

    if ( !data.mimetype.includes('image') ){
        res.send({
            message: `fail`, valid: false
        })
    }else{
        let newName = RandomString(25) + data.mimetype.replace("image/", ".");
        let dirName = Path.join(__dirname, "../../public/temp/")

        data.mv(dirName + newName, function(err, result){
            if(err) console.log(err)
            if(result) console.log("success")
        })
        
        res.send({
            message: 'ok', 
            valid: true,
            temp: `http://${req.get("host")}/temp/${newName}`
        })
    }
}

exports.deleteImage = (req, res) => {
    try{
        let path = Path.join(__dirname, `../../public/temp/${req.body.imageName}`)
        // console.log(path)
        fs.unlinkSync(path)
    }catch(err){
        console.log("no file")
    }
}