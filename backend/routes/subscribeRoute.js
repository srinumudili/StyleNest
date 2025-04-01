const express = require("express");
const { subscribeUser } = require("../controllers/subscribeController");

const router = express.Router();

// Define the subscription route
router.post("/", subscribeUser);

module.exports = router;
