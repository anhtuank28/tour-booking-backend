const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const { requireAuth, requireAdmin } = require("../middlewares/auth.middleware");

// Public Routes
router.get("/", categoryController.getCategories);

// Protected Admin Routes
router.post("/", requireAuth, requireAdmin, categoryController.createCategory);

module.exports = router;
