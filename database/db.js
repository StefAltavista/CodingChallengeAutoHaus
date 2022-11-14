const mongoose = require("mongoose");
const { User } = require("./models/User.js");

const connect = (secret) => {
    const mongoUri = `mongodb+srv://${secret.DB_ACCESS_USERNAME}:${secret.DB_ACCESS_KEY}@cluster1.xgf2w5g.mongodb.net/?retryWrites=true&w=majority`;

    mongoose.connect(mongoUri);
    mongoose.connection.on("connected", () => {
        console.log("Connected to mongo");
    });
    mongoose.connection.on("error", (err) => {
        console.log("error connecting to mongo", err);
    });
};

const newUser = async (body) => {
    return await tryCatch(() =>
        User.create({
            ...body,
        })
    );
};

const addData = async (body) => {
    console.log("THIS", body);
    return await tryCatch(() => {
        let user = User.findOneAndUpdate({ _id: body._id }, { ...body.data });
        console.log("db:");
        return user;
    });
};
const deleteUser = async ({ _id }) => {
    return await tryCatch(() => User.deleteOne({ _id }));
};

const findUser = async ({ _id }) => {
    return await tryCatch(() => User.find({ _id }).exec());
};

const findUserByEmail = async ({ email }) => {
    return await tryCatch(() => User.find({ email }).exec());
};
const listAllUsers = async () => {
    return await tryCatch(() =>
        User.find({}, "username firstname lastname email role address").exec()
    );
};

module.exports = {
    connect,
    newUser,
    addData,
    deleteUser,
    findUser,
    findUserByEmail,
    listAllUsers,
};

const tryCatch = async (fn) => {
    let success;
    try {
        success = await fn();
    } catch (error) {
        console.log("DB ERROR:", error);
        return error;
    }
    console.log("DB query successful");
    return success;
};
