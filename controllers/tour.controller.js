const Tour = require("../models/tour.model");

// [GET] /api/v1/tours
const getAllTours = async (req, res) => {
  try {
    const find = { deleted: false, status: "active" };

    if (req.query.category) {
      find.category = req.query.category;
    }

    if (req.query.keyword) {
      find.name = new RegExp(req.query.keyword, "i");
    }

    if (req.query.isFeatured) {
      find.isFeatured = req.query.isFeatured === "true";
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Tour.countDocuments(find);
    const tours = await Tour.find(find)
      .sort({ position: "desc", createdAt: "desc" })
      .skip(skip)
      .limit(limit);

    res.json({
      status: "success",
      data: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        tours,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// [GET] /api/v1/tours/:slug
const getTourDetail = async (req, res) => {
  try {
    const { slug } = req.params;
    const tour = await Tour.findOne({
      slug,
      deleted: false,
      status: "active",
    });

    if (!tour) {
      return res.status(404).json({
        status: "error",
        message: "Không tìm thấy thông tin tour",
      });
    }

    res.json({
      status: "success",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// [POST] /api/v1/tours
const createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    await newTour.save();

    res.status(201).json({
      status: "success",
      message: "Tạo tour thành công",
      data: newTour,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// [PUT] /api/v1/tours/:id
const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTour) {
      return res.status(404).json({
        status: "error",
        message: "Không tìm thấy tour cần cập nhật",
      });
    }

    res.json({
      status: "success",
      message: "Cập nhật tour thành công",
      data: updatedTour,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// [DELETE] /api/v1/tours/:id
const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.findByIdAndUpdate(id, {
      deleted: true,
      deletedAt: new Date(),
    });

    res.json({
      status: "success",
      message: "Xóa tour thành công",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllTours,
  getTourDetail,
  createTour,
  updateTour,
  deleteTour,
};
