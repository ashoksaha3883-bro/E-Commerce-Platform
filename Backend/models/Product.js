
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    oldPrice: {
      type: Number,
      default: null,
    },

    category: {
      type: String,
      required: true,
      enum: ["Women", "Men", "Kids"],
    },

    collection: {
      type: String,
      default: "New Collection",
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    colors: {
      type: [String],
      default: [],
    },

    sizes: {
      type: [String],
      default: [],
    },

    rating: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product
