import ProductModel from "../models/productModel.js";
import { validateProduct } from "../utils/validateProduct.js";

export default class ProductController {
  // get all the products
  getAllProducts = (req, res) => {
    const products = ProductModel.get();
    // Use the res.render() method to render the 'products' view, and pass in the products data
    return res.render("products", { products: products });
  };

  // render the form of the create product page
  renderCreateProduct = (req, res) => {
    res.render("createProduct", {
      errors: [],
      formData: {},
    });
  };

  // create the product
  createProduct = (req, res) => {
    const { name, description, price, imageUrl } = req.body;

    const errors = validateProduct({ name, description, price, imageUrl });

    if (errors.length > 0) {
      return res.status(400).render("createProduct", {
        errors,
        formData: { name, description, price, imageUrl },
      });
    }

    // Save product
    ProductModel.addProduct({ name, description, price, imageUrl });

    res.redirect("/products");
  };
}
