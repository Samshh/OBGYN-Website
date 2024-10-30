const express = require("express");
const { getUsers, createUser } = require("../app/Controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

module.exports = router;
