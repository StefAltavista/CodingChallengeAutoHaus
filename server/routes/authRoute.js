const express = require("express");
const router = express.Router();
const db = require("../../database/db.js");
const auth = require("../utils/jwt");
const { emailExists } = require("../utils/emailExists");
const { encryptPassword, decryptPassword } = require("../utils/cryptPass.js");

router.post("/api/signIn", async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.json({ error: "parameter missing" });
    }
    if (emailExists(email)) {
        return res.json({ error: "Email already in use" });
    }
    password = await encryptPassword(password);
    let newUser;
    try {
        newUser = await db.newUser({ email, password });
    } catch (e) {
        return res.json({ error: "database error" });
    }
    req.session.logIn = user._id;
    return res.json(newUser);
});

router.post("/api/logIn", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({ error: "parameter missing" });
    }
    let user = await emailExists(email);
    if (!user) {
        return res.json({ error: "Wrong Email" });
    }
    if (await decryptPassword(password, user.password)) {
        req.session.logIn = user._id;
        return res.json("success");
    } else res.json({ error: "Wrong Password" });
});

router.get("/api/logOut", async (req, res) => {
    req.session = null;
});

module.exports = router;
