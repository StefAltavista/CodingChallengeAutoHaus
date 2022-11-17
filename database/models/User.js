const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const usersSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: String,
    address: {
        street: String,
        number: String,
        postcode: String,
        city: String,
        country: String,
    },
    role: String,
});

const User = model("User", usersSchema);

module.exports = { User };
