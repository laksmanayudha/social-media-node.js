const Mongoose = require("mongoose");

let Schema = new Mongoose.Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    fullname: {type: String}
})

const user = Mongoose.model("users", Schema);
module.exports = user