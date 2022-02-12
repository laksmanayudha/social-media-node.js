const Mongoose = require("mongoose");

let Schema = Mongoose.Schema(
    {
        image: {type: String},
        caption: {type: String},
        createdBy: {type: String}
    },
    { timestamps: true }
)

const post = Mongoose.model("posts", Schema);
module.exports = post