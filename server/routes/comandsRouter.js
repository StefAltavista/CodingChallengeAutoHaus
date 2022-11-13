const express = require("express");
const router = express.Router();
const db = require("../../database/db.js");
const auth = require("../utils/jwt");

router.get("/api/employees", auth.requireAuth, async (req, res) => {
    const list = await db.listAllUsers();
    res.json(list);
});

router.post("/api/employee", auth.requireAuth, async (req, res) => {});

module.exports = router;
