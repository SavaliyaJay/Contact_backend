const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Plz, Enter user name"],
    },
    email: {
        type: String,
        required: [true, "Plz, Enter email"],
        unique: [true, "Email must be unique"]
    },
    password: {
        type: String,
        required: [true, "Plz, Enter password"],
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("user",userSchema)