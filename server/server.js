const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoute");
const path = require("path");
const cookieSession = require("cookie-session");

const db = require("../database/db.js");
const PORT = process.env.PORT || 5001;

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
app.use(authRoutes);

setTimeout(async () => {}, 2000);

db.connect(secret);
app.listen(PORT, async () => {
    console.log(`Server listening, port:${PORT}`);
});
