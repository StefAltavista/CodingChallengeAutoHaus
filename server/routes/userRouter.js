const express = require("express");
const router = express.Router();
const db = require("../../database/db.js");
const auth = require("../utils/jwt");

router.get("/api/user", auth.requireAuth, async (req, res) => {
    let user;
    try {
        user = await db.findUser({ _id: req.user.username });
    } catch (e) {
        console.log("database query error");
        return res.json({ error: "database query error" });
    }
    return res.json(user[0]);
});

router.post("/api/data", auth.requireAuth, async (req, res) => {
    let user;
    try {
        user = await db.addData({
            _id: req.user.username,
            data: { ...req.body },
        });
    } catch (e) {
        console.log("DB query error");
        return res.json({ error: "DB query error" });
    }
    return res.json({ success: "true" });
});

module.exports = router;
