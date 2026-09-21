const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller");
const { requireAuth, requireAdmin } = require("../middlewares/auth.middleware");

// Public Routes
router.get("/", tourController.getAllTours);
router.get("/:slug", tourController.getTourDetail);

// Protected Admin Routes
router.post("/", requireAuth, requireAdmin, tourController.createTour);
router.put("/:id", requireAuth, requireAdmin, tourController.updateTour);
router.delete("/:id", requireAuth, requireAdmin, tourController.deleteTour);

module.exports = router;
