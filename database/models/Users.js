// import mongoose from "mongoose";
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const usersSchema = new Schema({
    username: String,
    password: String,
    name: String,
    surname: String,
    email: String,
    address: String,
    role: String,
});

const User = model("User", usersSchema);

module.exports = { User };
