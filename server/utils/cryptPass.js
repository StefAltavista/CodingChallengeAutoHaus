const bcrypt = require("bcrypt");

const encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(5, (err, salt) => {
            if (err) {
                console.log("crypt err1", err);
                reject({ e: err });
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    console.log("crypt err2", err);
                    reject({ e: err });
                }

                resolve(hash);
            });
        });
    });
};

const decryptPassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, isMatch) => {
            if (err) {
                reject({ err });
            }
            resolve(isMatch ? true : false);
        });
    });
};

module.exports = {
    encryptPassword,
    decryptPassword,
};
