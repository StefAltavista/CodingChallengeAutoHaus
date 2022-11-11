const jwt = require("jsonwebtoken");
const secret =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("../../config.json");

createToken = (username) => {
    const maxAge = 60 * 30; // 30 minutes
    return jwt.sign({ username }, secret.JWT_KEY, {
        expiresIn: maxAge,
    });
};

requireAuth = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;

        jwt.verify(token, secret.JWT_KEY, (err, username) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    console.log("token expired");
                    res.json({ error: "Session expired" });
                } else {
                    console.log("fake token");
                    res.json({ error: "fake token" });
                }
            } else {
                req.user = username;
                next();
            }
        });
    } else {
        console.log("No authorization headers.");
        res.json({ error: "No authorization headers." });
    }
};

module.exports = {
    createToken,
    requireAuth,
};
