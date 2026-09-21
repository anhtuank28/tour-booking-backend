const Category = require("../models/category.model");

// [GET] /api/v1/categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      deleted: false,
      status: "active",
    }).sort({ position: "asc" });

    res.json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// [POST] /api/v1/categories
const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();

    res.status(201).json({
      status: "success",
      message: "Tạo danh mục thành công",
      data: newCategory,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getCategories,
  createCategory,
};
