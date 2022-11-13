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

const newUser = async ({ email, password }) => {
    return await tryCatch(() =>
        User.create({
            email,
            password,
            username: "",
            firstname: "",
            lastname: "",
            address: "",
            role: "",
        })
    );
};

const addData = async ({
    email,
    username,
    firstname,
    lastname,
    address,
    role,
}) => {
    return await tryCatch(() =>
        User.findOneAndUpdate(
            { email },
            { username, firstname, lastname, address, role },

            function (err, res) {
                console.log("error", err);
                console.log("resolution", res);
            }
        )
    );
};
const deleteUser = async ({ email }) => {
    return await tryCatch(() => User.deleteOne({ email }));
};

const findUserByEmail = async ({ email }) => {
    return await tryCatch(() => User.find({ email }).exec());
};

module.exports = {
    connect,
    newUser,
    addData,
    deleteUser,
    findUserByEmail,
};

const tryCatch = async (fn) => {
    let success;
    try {
        success = await fn();
    } catch (error) {
        console.log("DB ERROR:", error);
        return error;
    }
    console.log("DB query successful", success);
    return success;
};
