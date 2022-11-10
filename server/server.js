const express = require("express");
const cookieSession = require("cookie-session");
const app = express();
const PORT = process.env.PORT || 6001;

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

app.listen(PORT, () => {
    console.log(`Server listening, port:${PORT}`);
});
