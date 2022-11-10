// import mongoose from "mongoose";
const mongoose = require("mongoose");
const { User } = require("./models/Users.js");
// import User from "./models/Users";

const secret =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("../config.json");
const mongoUri = `mongodb+srv://${secret.DB_ACCESS_USERNAME}:${secret.DB_ACCESS_KEY}@cluster1.xgf2w5g.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
    console.log("Connected to mongo");
});
mongoose.connection.on("error", (err) => {
    console.log("error connecting to mongo", err);
});

// TEST
// const user1 = User.create({
//     id: 0,
//     username: "fistUser",
//     password: "123",
// });

// const action = async () => {
//     const getFirst = await User.findOne({});
//     console.log(getFirst);
// };

// action();
