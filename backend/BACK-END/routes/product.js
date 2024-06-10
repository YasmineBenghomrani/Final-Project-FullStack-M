import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductByID,
  rateProduct,
  updateProduct,
} from "../controllers/product.js";
import isAuthenticated from "../midelw/isAuthenticated.js";

const productRouter = express.Router();

// Route to create a new product
productRouter.post("/", isAuthenticated, createProduct);

// Route to get all products
productRouter.get("/", getAllProduct);

// Route to get a product by ID
productRouter.get("/:id", getProductByID);

// Route to update a product by ID
productRouter.put("/:id", isAuthenticated, updateProduct);

// Route to delete a product by ID
productRouter.delete("/:id", isAuthenticated, deleteProduct);

// Route to add a new rating
productRouter.post("/rate/:id", isAuthenticated, rateProduct);

export default productRouter;
