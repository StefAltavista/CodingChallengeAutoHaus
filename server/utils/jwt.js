const jwt = require("jsonwebtoken");
const secret =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("../config.json");

createToken = (username) => {
    const maxAge = 60 * 30; // 30 minutes
    return jwt.sign({ username }, secret.JWT_KEY, {
        expiresIn: maxAge,
    });
};

createRefreshToken = (username) => {
    const maxAge = "30d"; // 30 days
    return jwt.sign({ username }, secret.JWT_KEY, {
        expiresIn: maxAge,
    });
};

requireAuth = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;

        jwt.verify(token, secret.JWT_KEY, (err) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    console.log("token expired");
                    res.json(false); //send smt else
                } else {
                    //we should directly log out here since the token is fake
                    console.log("fake token");
                    res.json(false);
                }
            } else {
                next();
            }
        });
    } else {
        console.log("No authorization headers.");
        res.json(false);
    }
};

requireRefreshAuth = (req, res, next) => {
    if (req.headers.refreshauthorization) {
        const refreshToken = req.headers.refreshauthorization;

        jwt.verify(refreshToken, secret.JWT_KEY, (err) => {
            if (err) {
                res.json(false);
            } else {
                next();
            }
        });
    } else {
        console.log("No authorization headers.");
        res.json(false);
    }
};

module.exports = {
    createToken,
    createRefreshToken,
    requireAuth,
    requireRefreshAuth,
};
