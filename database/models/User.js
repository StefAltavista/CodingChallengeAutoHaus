const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const usersSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    userName: String,
    firstName: String,
    lastName: String,
    address: String,
    role: String,
});

const User = model("User", usersSchema);

module.exports = { User };
