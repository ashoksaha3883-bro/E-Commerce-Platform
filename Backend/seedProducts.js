import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import { productData } from "./data/productData.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(productData);

    console.log("Products added successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error adding products:", error);
    process.exit(1);
  }
};

seedProducts();