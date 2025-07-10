import express from "express";
import ProductController from "./src/controllers/productController.js";

const app = express();
const PORT = 3000;

// middleware fro serving static files
app.use(express.static("src/views"));

// instance of the product controller
const productController = new ProductController();

// rendering the html page with the products
app.get("/", productController.getAllProducts);

// just get the products data
app.get("/products", productController.getProductsData);

app.listen(PORT, () => {
  console.log("server is running at PORT", PORT);
});
