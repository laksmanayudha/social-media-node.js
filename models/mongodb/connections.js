const Mongoose = require("mongoose")

const connectDB = async () => {
    try{
        const connect = await Mongoose.connect(
            process.env.MONGODB_DB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )

        console.log("MongoDB connected: " + connect.connection.host)
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB