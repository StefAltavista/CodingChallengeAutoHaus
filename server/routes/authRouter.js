const express = require("express");
const router = express.Router();
const db = require("../../database/db.js");
const auth = require("../utils/jwt");
const { emailExists } = require("../utils/emailExists");
const { encryptPassword, decryptPassword } = require("../utils/cryptPass.js");

router.post("/api/signIn", async (req, res) => {
    let { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname || !lastname) {
        return res.json({ error: "parameter missing" });
    }
    if (await emailExists(email)) {
        return res.json({ error: "Email already in use" });
    }
    req.body.password = await encryptPassword(password);
    let newUser;
    try {
        newUser = await db.newUser(req.body);
    } catch (e) {
        return res.json({ error: "database error" });
    }
    const token = auth.createToken(newUser._id);
    req.session.access = token;
    return res.json({ success: true });
});

router.post("/api/logIn", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ error: "parameter missing" });
    }
    let user = await emailExists(email);
    if (!user) {
        return res.json({ error: "Wrong Email" });
    }
    if (await decryptPassword(password, user.password)) {
        const token = auth.createToken(user._id);
        req.session.access = token;
        return res.json({ success: true });
    } else res.json({ error: "Wrong Password" });
});

router.get("/api/validate", (req, res) => {
    const response = auth.verification(req.session.access);
    return res.json({ ...response });
});
router.get("/api/logOut", async (req, res) => {
    req.session = null;
    res.json({ success: "User succesfully logged out" });
});

module.exports = router;
