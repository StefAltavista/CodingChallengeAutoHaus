const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const usersSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: String,
    firstname: String,
    lastname: String,
    address: {
        street: String,
        number: Number,
        postcode: String,
        city: String,
        country: String,
    },
    role: String,
});

const User = model("User", usersSchema);

module.exports = { User };
