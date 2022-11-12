const db = require("../../database/db.js");

const emailExists = async (email) => {
    const search = await db.findUserByEmail({ email });
    return search[0] ? search[0] : false;
};

module.exports = { emailExists };
