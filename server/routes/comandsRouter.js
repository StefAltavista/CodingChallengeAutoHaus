const express = require("express");
const router = express.Router();
const db = require("../../database/db.js");
const auth = require("../utils/jwt");
const { emailExists } = require("../utils/emailExists");
const { encryptPassword } = require("../utils/cryptPass.js");

router.get("/api/employees", auth.requireAuth, async (req, res) => {
    const list = await db.listAllUsers();
    res.json(list);
});

router.get("/api/employee", auth.requireAuth, async (req, res) => {
    const user = await db.findUser({ _id: req.headers.userid });
    res.json(user[0]);
});

router.post("/api/newemployee", auth.requireAuth, async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
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
        console.log("DB query error", e);
        return res.json({ error: "DB query error" });
    }
    res.json({ success: newUser });
});
router.post("/api/employeedata", auth.requireAuth, async (req, res) => {
    let user;
    try {
        user = await db.addData({
            _id: req.headers.userid,
            data: { ...req.body },
        });
        console.log("DB response", user);
    } catch (e) {
        console.log("DB query error");
        return res.json({ error: "DB query error" });
    }

    res.json({ success: user });
});

router.post("/api/csvlist", auth.requireAuth, async (req, res) => {
    console.log("body:", req.body);
});

module.exports = router;
