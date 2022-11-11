const { model } = require("mongoose");
const db = require("../../database/db.js");

const exists = async (req, res, next) => {
    let { email } = req.body;
    const search = await db.findUser({ email });
    console.log("from here: ", search);
    if (search[0]) {
        console.log("E-Mail address alredy registered");
        res.json({ e: "E-Mail address alredy registered" });
    } else {
        console.log("all good");
        next();
    }
};

module.exports = { exists };
