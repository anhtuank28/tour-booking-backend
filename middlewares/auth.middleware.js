const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const requireAuth = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Bạn chưa đăng nhập hoặc token không hợp lệ",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret");
    const currentUser = await User.findById(decoded.id).select("-password");

    if (!currentUser || currentUser.deleted || currentUser.status !== "active") {
      return res.status(401).json({
        status: "error",
        message: "Người dùng không tồn tại hoặc đã bị khóa",
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Token không hợp lệ hoặc đã hết hạn",
    });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({
    status: "error",
    message: "Bạn không có quyền thực hiện hành động này (Chỉ dành cho Admin)",
  });
};

module.exports = {
  requireAuth,
  requireAdmin,
};
