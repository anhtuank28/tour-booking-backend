const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

// Authentication Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", requireAuth, authController.getProfile);

module.exports = router;
