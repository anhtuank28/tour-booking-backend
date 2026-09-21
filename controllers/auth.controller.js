const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_jwt_secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// [POST] /api/v1/auth/register
const register = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email, deleted: false });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email đã được sử dụng bởi tài khoản khác",
      });
    }

    const newUser = new User({
      fullName,
      email,
      password,
      phone,
    });

    await newUser.save();
    const token = generateToken(newUser._id);

    res.status(201).json({
      status: "success",
      message: "Đăng ký tài khoản thành công",
      data: {
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
        },
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// [POST] /api/v1/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, deleted: false });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Email hoặc mật khẩu không chính xác",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Email hoặc mật khẩu không chính xác",
      });
    }

    const token = generateToken(user._id);

    res.json({
      status: "success",
      message: "Đăng nhập thành công",
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// [GET] /api/v1/auth/profile
const getProfile = async (req, res) => {
  res.json({
    status: "success",
    data: req.user,
  });
};

module.exports = {
  register,
  login,
  getProfile,
};
