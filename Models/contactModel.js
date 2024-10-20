const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Plz, Enter name"],
    },
    email: {
        type: String,
        required: [true, "Plz, Enter email"]
    },
    phone: {
        type: String,
        required: [true, "Plz, Enter phone number"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("conatct", contactSchema)