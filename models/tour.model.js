const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    priceAdult: {
      type: Number,
      required: true,
      default: 0,
    },
    priceChildren: {
      type: Number,
      default: 0,
    },
    priceBaby: {
      type: Number,
      default: 0,
    },
    priceNewAdult: {
      type: Number,
      default: 0,
    },
    stockAdult: {
      type: Number,
      default: 10,
    },
    locations: {
      type: [String],
      default: [],
    },
    locationFrom: {
      type: String,
      default: "Hà Nội",
    },
    time: {
      type: String,
      default: "3N2Đ",
    },
    vehicle: {
      type: String,
      default: "Máy bay / Ô tô",
    },
    departureDate: {
      type: Date,
    },
    information: {
      type: String,
      default: "",
    },
    schedules: {
      type: [Object],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    position: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

tourSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Tour = mongoose.model("Tour", tourSchema, "tours");

module.exports = Tour;
