const jwt = require("jsonwebtoken");
const secret =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("../../config.json");

const createToken = (username) => {
    const maxAge = 60 * 30; // 30 minutes
    return jwt.sign({ username }, secret.JWT_KEY, {
        expiresIn: maxAge,
    });
};

const requireAuth = (req, res, next) => {
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

const verification = (token) => {
    return token
        ? jwt.verify(token, secret.JWT_KEY, (err, username) => {
              if (err) {
                  if (err.name === "TokenExpiredError") {
                      console.log("token expired");
                      return { error: "Session expired" };
                  } else {
                      console.log("fake token");
                      return { error: "fake token" };
                  }
              } else {
                  return { token };
              }
          })
        : { error: "No Access" };
};

module.exports = {
    createToken,
    requireAuth,
    verification,
};
