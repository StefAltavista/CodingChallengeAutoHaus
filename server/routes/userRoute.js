const express = require("express");
const router = express.Router();
const db = require("../../database/db.js");
const auth = require("../utils/jwt");

router.get("/api/user", auth.requireAuth, async (req, res) => {
    let user;
    try {
        user = await db.findUserByEmail({ email: req.user.username });
    } catch (e) {
        console.log("database query error");
        return res.json({ error: "database query error" });
    }
    return res.json(user[0]);
});

module.exports = router;
