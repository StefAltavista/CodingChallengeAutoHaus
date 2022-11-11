const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const app = express();
const PORT = process.env.PORT || 6001;
const db = require("../database/db.js");
const { exists } = require("./middleware/user");

const secret =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("../config.json");

const cookieSessionMiddleware = cookieSession({
    name: "Autohaus-Royal",
    secret: secret.COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: true,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(cookieSessionMiddleware);

app.post("./api/newuser", exists, async (req, res) => {
    const { email, password } = req.body;
    const newUser = await db.newUser({ email, password });
    res.json(newUser);
});

db.connect(secret);
app.listen(PORT, async () => {
    console.log(`Server listening, port:${PORT}`);
});
