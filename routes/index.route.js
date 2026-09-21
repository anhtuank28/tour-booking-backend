const tourRoutes = require("./tour.route");
const categoryRoutes = require("./category.route");
const orderRoutes = require("./order.route");
const authRoutes = require("./auth.route");

const routes = (app) => {
  const API_VERSION = "/api/v1";

  app.use(`${API_VERSION}/tours`, tourRoutes);
  app.use(`${API_VERSION}/categories`, categoryRoutes);
  app.use(`${API_VERSION}/orders`, orderRoutes);
  app.use(`${API_VERSION}/auth`, authRoutes);
};

module.exports = routes;
