import path from "path";
import ProductModel from "../models/productModel.js";

export default class ProductController {
  // get all the products
  getAllProducts = (req, res) => {
    res.sendFile(path.join(path.resolve(), "src", "views", "products.html"));
  };

  // get only the data of the products
  getProductsData = (req, res) => {
    const products = ProductModel.get();

    res.status(200).json({
      success: true,
      data: products,
    });
  };
}
