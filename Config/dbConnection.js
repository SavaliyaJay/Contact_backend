const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.dbLink,{
            dbName: "contact"
        });
        console.log("Database Connected.",connect.connection.name);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB